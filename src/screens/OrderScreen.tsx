import { View, Text, FlatList, Pressable, Alert, Platform } from 'react-native'
import React from 'react'
import { useCart, useWallet } from '@/context'
import { StyleSheet } from 'react-native-unistyles'
import { buildPlaceOrderTransaction } from '@/services/solana/placeOrder'
import { PublicKey, VersionedTransaction } from '@solana/web3.js'
import * as Linking from "expo-linking";
import { buildSignAndSendURL } from '@/services/wallet/phantomClient'
import walletClient from '@/services/wallet/walletClient'

const OrderScreen = () => {
  const { items: cartItems, clearCart } = useCart()
  const { walletSession, dappKeyPair } = useWallet()

  const handleOrder = async () => {

    if (!walletSession) {
      Alert.alert("Wallet not connected", "Please connect your wallet to place the order");
      return;
    }

    const tx = await buildPlaceOrderTransaction(
      new PublicKey(walletSession.publicKey),
      cartItems
    );

    if (Platform.OS === "ios") {
      const serialized = (tx as VersionedTransaction)
        .serialize({ requireAllSignatures: false })
        .toString("base64");

      const url = buildSignAndSendURL(
        serialized,
        walletSession,
        dappKeyPair,
        "/order"
      );

      await Linking.openURL(url);
      return;
    }

    try {
      const signature = await walletClient.signAndSendTransaction(
        tx as VersionedTransaction
      );
      Alert.alert("Success", `Transaction sent: ${signature}`);
      clearCart();
    } catch (e) {
      console.error("Failed to send transaction via wallet adapter:", e);
      Alert.alert("Error", "Failed to send transaction");
    }

};

  return (
    <View style={styles.container}>
      <FlatList 
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.name}>{item.quantity}</Text>
          </View>
        )}
        style={{flexGrow: 0, width: '100%', paddingHorizontal: 25}}
      />
      <Pressable style={{marginTop: 20, backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}} onPress={()=>handleOrder()}>
        <Text style={{color: '#fff', fontFamily: 'Sora_600SemiBold'}}> Order</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create(theme=>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name:{
    fontSize: 16,
    fontFamily: 'Sora_600SemiBold',
    color: theme.colors.grey.normalActive
  }
}))

export default OrderScreen