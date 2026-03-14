import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import WalletScreen from '@/screens/WalletScreen';
import CustomTabBar from './CustomTabBar';
import { useWallet } from '@/context/WalletContext';
import * as Linking from "expo-linking";
import OrderScreen from '@/screens/OrderScreen';
import { VersionedTransaction } from '@solana/web3.js';
import { connection } from '@/services/solana/connection';
import { Alert } from 'react-native';
import bs58 from "bs58";
import { useCart } from '@/context';
import { decryptCallbackPayload, decryptConnectPayload } from '@/services/wallet/phantomClient';


const Tab = createBottomTabNavigator();


const BottomTabsNavigator = () => {
  const { dappKeyPair, walletSession, setWalletSession } = useWallet()
    const { clearCart } = useCart();


useEffect(() => {
  const subscription = Linking.addEventListener("url", ({ url }) => {
    const { queryParams } = Linking.parse(url);

    if (!queryParams) return;

    // error handled inside decrypt functions, but catch it early for user feedback
    if (queryParams.errorCode) {
      Alert.alert("Phantom Error", queryParams.errorMessage as string);
      return;
    }

    // ── Connect callback ──────────────────────────────────────────────
    if (queryParams.phantom_encryption_public_key) {
      const result = decryptConnectPayload(
        queryParams as Record<string, string>,
        dappKeyPair
      );
      if (!result) {
        Alert.alert("Error", "Failed to decrypt connect response");
        return;
      }
      setWalletSession({
        publicKey: result.payload.public_key,
        session: result.payload.session,
        sharedSecret: result.sharedSecret,
        phantomPublicKey: result.phantomPublicKey,
      });
      return;
    }

    // ── Transaction callback ──────────────────────────────────────────
    if (queryParams.nonce && queryParams.data && walletSession) {
      const payload = decryptCallbackPayload<{ transaction: string }>(
        queryParams as Record<string, string>,
        walletSession.sharedSecret
      );
      if (!payload?.transaction) {
        Alert.alert("Error", "Failed to decrypt transaction response");
        return;
      }

      const signedTx = VersionedTransaction.deserialize(
        bs58.decode(payload.transaction)
      );

      connection
        .sendRawTransaction(signedTx.serialize())
        .then((signature) => {
          Alert.alert("Success", `Transaction sent: ${signature}`);
          clearCart();
        })
        .catch((err) => {
          console.error("Failed to send transaction:", err);
          Alert.alert("Error", "Failed to send transaction");
        });
    }
  });

  return () => subscription.remove();
}, [dappKeyPair, walletSession]);
  return (
     <Tab.Navigator
     screenOptions={{
        headerShown: false,
     }}
     tabBar={(props)=><CustomTabBar {...props} />}
     >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="More" component={WalletScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabsNavigator