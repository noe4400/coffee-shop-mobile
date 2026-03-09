import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import WalletScreen from '@/screens/WalletScreen';
import CustomTabBar from './CustomTabBar';
import { useWallet } from '@/context/WalletContext';
import { decryptPhantomPayload } from '@/services/wallet/phantomClient';
import * as Linking from "expo-linking";
import OrderScreen from '@/screens/OrderScreen';
import { VersionedTransaction } from '@solana/web3.js';
import { connection } from '@/services/solana/connection';
import { Alert } from 'react-native';
import bs58 from "bs58";
import { useCart } from '@/context';


const Tab = createBottomTabNavigator();


const BottomTabsNavigator = () => {
    const { setPublicKey, setSession } = useWallet();
    const { clearCart } = useCart();


useEffect(() => {
  const subscription = Linking.addEventListener("url", ({ url }) => {
    const { queryParams } = Linking.parse(url);

    if (!queryParams) return;

    if (queryParams.errorCode) {
      Alert.alert("Phantom error", queryParams.errorMessage as string);
      return;
    }

    const payload = decryptPhantomPayload(queryParams);
    if (!payload) return;

    // connect response
    if (payload.public_key) {
      setPublicKey(payload.public_key);
      setSession(payload.session);
      return;
    }

    // transaction response
    if (payload.transaction) {
      console.log("payload transaction", payload)
      const signedTx = VersionedTransaction.deserialize(
        bs58.decode(payload.transaction)
      );
      connection.sendRawTransaction(signedTx.serialize())
        .then((signature) => {
          Alert.alert("Success", "Transaction sent: " + signature);
          clearCart();
          // clear cart, navigate to success, etc.
        })
        .catch((err) => {
          console.error("Failed to send transaction:", err);
          Alert.alert("Error", "Failed to send transaction");
        });
    }
  });

  return () => subscription.remove();
}, []);

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