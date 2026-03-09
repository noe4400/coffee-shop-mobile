import { View, Text, Button, Pressable } from 'react-native'
import React, { use } from 'react'

import { useWallet } from '@/context'
import { createPhantomConnection } from '@/services/wallet/phantomClient'

const WalletScreen = () => {
  const {publicKey, setPublicKey} = useWallet()
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!publicKey ? (
        <Button
          title="Connect Phantom"
          onPress={() => createPhantomConnection()}
        />
      ) : (
        <View>
        <Text>Wallet conected</Text>
        <Pressable onPress={() => setPublicKey(null)}><Text>Disconnect wallet</Text></Pressable>
        </View>
      )}
    </View>
  )
}

export default WalletScreen