import { View, Text, Button } from 'react-native'
import React from 'react'
import { createPhantomConnection } from '@/services/wallet/phantomClient'

const WalletScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <Button
      title="Connect Phantom"
      onPress={() => createPhantomConnection()}
    />
    </View>
  )
}

export default WalletScreen