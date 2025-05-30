import { StatusBar,} from 'react-native';

import {useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin, Roboto_200ExtraLight} from "@expo-google-fonts/roboto"

import {OneSignal} from "react-native-onesignal"

import {GluestackUIProvider} from "@gluestack-ui/themed"

import {config} from "./config/gluestack-ui.config"
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';

import {  AuthContextProvider } from '@contexts/AuthContext'; 

OneSignal.initialize("de48bf14-225e-4dcb-b631-34a33687ecbd")
OneSignal.Notifications.requestPermission(true)
// OneSignal.promptForPushNotificationsWithUserResponse()


export default function App() {

  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold, Roboto_100Thin, Roboto_200ExtraLight})

  return (
    <GluestackUIProvider config={config}>
        <AuthContextProvider>
          {fontsLoaded ?  <Routes/> : <Loading/>}

        </AuthContextProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/> 

    </GluestackUIProvider>
  );
}

