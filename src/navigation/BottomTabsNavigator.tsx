import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import WalletScreen from '@/screens/WalletScreen';
import CustomTabBar from './CustomTabBar';
import { useWallet } from '@/context/WalletContext';
import { decryptPhantomPayload } from '@/services/wallet/phantomClient';
import * as Linking from "expo-linking";
import OrderScreen from '@/screens/OrderScreen';

const Tab = createBottomTabNavigator();


const BottomTabsNavigator = () => {
    const { setPublicKey } = useWallet();


useEffect(() => {
  const subscription = Linking.addEventListener("url", ({ url }) => {
    const { queryParams } = Linking.parse(url);

    if (!queryParams) return;

    const payload = decryptPhantomPayload(queryParams);

    if (payload?.public_key) {
      setPublicKey(payload.public_key);
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