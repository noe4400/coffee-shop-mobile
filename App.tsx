import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import SplashScreen from './src/screens/SplashScreen';


import { useFonts } from '@expo-google-fonts/sora/useFonts';
import { Sora_100Thin } from '@expo-google-fonts/sora/100Thin';
import { Sora_200ExtraLight } from '@expo-google-fonts/sora/200ExtraLight';
import { Sora_300Light } from '@expo-google-fonts/sora/300Light';
import { Sora_400Regular } from '@expo-google-fonts/sora/400Regular';
import { Sora_500Medium } from '@expo-google-fonts/sora/500Medium';
import { Sora_600SemiBold } from '@expo-google-fonts/sora/600SemiBold';
import { Sora_700Bold } from '@expo-google-fonts/sora/700Bold';
import { Sora_800ExtraBold } from '@expo-google-fonts/sora/800ExtraBold';

export default function App() {

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
    let fontSize = 24;
  let paddingVertical = 6;
  // return (
  //   <View style={styles.container}>
  //     <StatusBar style="auto" />
  //     <SplashScreen />
  //   </View>
  // );
   if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Sora_100Thin"
        }}>
          Sora Thin
        </Text>
        <Text style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Sora_200ExtraLight"
        }}>
          Sora Extra Light
        </Text>
        <Text style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Sora_300Light"
        }}>
          Sora Light
        </Text>
        <Text style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Sora_400Regular"
        }}>
          Sora Regular
        </Text>
        <Text style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Sora_500Medium"
        }}>
          Sora Medium
        </Text>
        <Text style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Sora_600SemiBold"
        }}>
          Sora Semi Bold
        </Text>
        <Text style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Sora_700Bold"
        }}>
          Sora Bold
        </Text>
        <Text style={{
          fontSize,
          paddingVertical,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
          fontFamily: "Sora_800ExtraBold"
        }}>
          Sora Extra Bold
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create((theme) =>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
