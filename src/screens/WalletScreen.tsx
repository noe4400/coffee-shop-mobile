import { View, Text, Pressable, ActivityIndicator, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import { useWallet } from '@/context'
import { openPhantomConnect } from '@/services/wallet/phantomClient'
import walletClient from '@/services/wallet/walletClient'


const WalletScreen = () => {
  const { dappKeyPair, walletSession, setWalletSession, disconnect } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      if (Platform.OS === "ios") {
        await openPhantomConnect(dappKeyPair)
      } else {
        const session = await walletClient.connect();
        setWalletSession(session);
      }
    } catch (error) {
      Alert.alert(
        'Wallet Not Found',
        'Please install a compatible wallet app to continue.',
        [{ text: 'OK' }]
      )
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect Wallet',
      'Are you sure you want to disconnect?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Disconnect', style: 'destructive', onPress: disconnect },
      ]
    )
  }

  const shortKey = walletSession?.publicKey
    ? `${walletSession.publicKey.slice(0, 4)}...${walletSession.publicKey.slice(-4)}`
    : null

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      {!walletSession ? (
        <Pressable
          onPress={handleConnect}
          disabled={isConnecting}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#7c3aed' : '#9945FF',
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
            opacity: isConnecting ? 0.7 : 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          })}
        >
          {isConnecting && <ActivityIndicator color="#fff" size="small" />}
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
            {isConnecting ? 'Opening Phantom...' : 'Connect Phantom'}
          </Text>
        </Pressable>
      ) : (
        <View style={{ alignItems: 'center', gap: 12 }}>
          <View style={{
            backgroundColor: '#f3f4f6',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}>
            <Text style={{ fontSize: 13, color: '#6b7280' }}>Connected wallet</Text>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>
              {shortKey}
            </Text>
          </View>

          <Pressable
            onPress={handleDisconnect}
            style={({ pressed }) => ({
              borderWidth: 1,
              borderColor: '#ef4444',
              paddingHorizontal: 24,
              paddingVertical: 10,
              borderRadius: 10,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ color: '#ef4444', fontWeight: '600' }}>Disconnect</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default WalletScreen