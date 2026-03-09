import './src/polyfills';
import { useFonts } from '@expo-google-fonts/sora/useFonts';
import { Sora_100Thin } from '@expo-google-fonts/sora/100Thin';
import { Sora_200ExtraLight } from '@expo-google-fonts/sora/200ExtraLight';
import { Sora_300Light } from '@expo-google-fonts/sora/300Light';
import { Sora_400Regular } from '@expo-google-fonts/sora/400Regular';
import { Sora_500Medium } from '@expo-google-fonts/sora/500Medium';
import { Sora_600SemiBold } from '@expo-google-fonts/sora/600SemiBold';
import { Sora_700Bold } from '@expo-google-fonts/sora/700Bold';
import { Sora_800ExtraBold } from '@expo-google-fonts/sora/800ExtraBold';
import BottomTabsNavigator from '@/navigation/BottomTabsNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider, WalletProvider } from '@/context';



export default function App() {
  const queryClient = new QueryClient()

  let [fontsLoaded] = useFonts({
    Sora_100Thin, 
    Sora_200ExtraLight, 
    Sora_300Light, 
    Sora_400Regular, 
    Sora_500Medium, 
    Sora_600SemiBold, 
    Sora_700Bold, 
    Sora_800ExtraBold
  });
   if (!fontsLoaded) {
    return null;
  } else {
    return (
          <NavigationContainer>
             <QueryClientProvider client={queryClient}>
              <WalletProvider>
                <CartProvider>
                 <BottomTabsNavigator />
                </CartProvider>
              </WalletProvider>
            </QueryClientProvider>
          </NavigationContainer>
    );
  }
}


