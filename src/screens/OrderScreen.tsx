import { View, Text, FlatList, Pressable, Alert } from 'react-native'
import React from 'react'
import { useCart, useWallet } from '@/context'
import { StyleSheet } from 'react-native-unistyles'
import { buildPlaceOrderTransaction } from '@/services/solana/placeOrder'
import { PublicKey } from '@solana/web3.js'
import * as Linking from "expo-linking";
import { createURLSearchParams, getEncryptedPayload } from '@/services/wallet/phantomClient'

const OrderScreen = () => {
  const {items:cartItems} = useCart()
  const {publicKey, session} = useWallet()

  const handleOrder = async () => {

    if(!publicKey || !session) {
      Alert.alert("Wallet not connected", "Please connect your wallet to place the order");
      return;
    }

  const tx = await buildPlaceOrderTransaction(
    new PublicKey(publicKey),
    cartItems
  );

  const serialized = tx
    .serialize({ requireAllSignatures: false })
    .toString("base64");

    // encrypt the payload
    const encryptedPayload  = getEncryptedPayload({serialized, session})
    const params = createURLSearchParams({encryptedPayload});
  
  const url =
    `https://phantom.app/ul/v1/signTransaction?${params}`;

 Linking.openURL(url);

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