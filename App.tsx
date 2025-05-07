import { StatusBar, View } from 'react-native';

import {useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin, Roboto_200ExtraLight} from "@expo-google-fonts/roboto"

import {Center, GluestackUIProvider, Text} from "@gluestack-ui/themed"

import {config} from "./config/gluestack-ui.config"
import { Loading } from '@components/Loading';
import { SignUp } from '@screens/SignUp';

export default function App() {

  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold, Roboto_100Thin, Roboto_200ExtraLight})

  return (
    <GluestackUIProvider config={config}>
        {fontsLoaded ?  <SignUp/> : <Loading/>}
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/> 

    </GluestackUIProvider>
  );
}

