import { StatusBar,} from 'react-native';

import {useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin, Roboto_200ExtraLight} from "@expo-google-fonts/roboto"

import {GluestackUIProvider} from "@gluestack-ui/themed"

import {config} from "./config/gluestack-ui.config"
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';

export default function App() {

  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold, Roboto_100Thin, Roboto_200ExtraLight})

  return (
    <GluestackUIProvider config={config}>
        {fontsLoaded ?  <Routes/> : <Loading/>}
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/> 

    </GluestackUIProvider>
  );
}

