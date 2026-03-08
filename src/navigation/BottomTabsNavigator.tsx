import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import WalletScreen from '@/screens/WalletScreen';
import CustomTabBar from './CustomTabBar';
const Tab = createBottomTabNavigator();


const BottomTabsNavigator = () => {
  return (
     <Tab.Navigator
     screenOptions={{
        headerShown: false,
     }}
     tabBar={(props)=><CustomTabBar {...props} />}
     >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Order" component={WalletScreen} />
      <Tab.Screen name="More" component={WalletScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabsNavigator