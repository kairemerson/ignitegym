import { useEffect, useState } from "react"
import {NavigationContainer, DefaultTheme} from "@react-navigation/native"

import {AuthRoutes} from "./auth.routes"
import { AppRoutes } from "./app.routes"

import {gluestackUIConfig} from "../../config/gluestack-ui.config"
import { Box } from "@gluestack-ui/themed"

import { UseAuth } from "@hooks/useAuth"
import { Loading } from "@components/Loading"
import {Notification} from "@components/Notification"

import  {NotificationWillDisplayEvent, OneSignal, OSNotification } from "react-native-onesignal"

import * as Linking from 'expo-linking'


const linking = {
    prefixes: ["ignitegym://", "exp+ignitegym://"],
    config :{
        screens: {
           exercise: {
            path: "exercises/:exerciseId",
            parse: {
                exerciseId: (exerciseId: string) => exerciseId 
            }
           } 
        }
    }
}

export function Routes() {
    const [notification, setNotification] = useState<OSNotification>()
    const {user, isLoadingUserStorageData} = UseAuth() 


    const theme = DefaultTheme

    theme.colors.background = gluestackUIConfig.tokens.colors.gray700


    if(isLoadingUserStorageData) {
        return <Loading/>
    }

    useEffect(()=> {
        const handleNotification = (event: NotificationWillDisplayEvent) => {
            event.preventDefault()

            const response = event.getNotification()
            setNotification(response)
        }

        const handleNotificationClick = (event: any) => {
            console.log('Notificação clicada:', JSON.stringify(event, null, 2));

            const launchURL = event.notification.launchUrl || event.result?.url;
            console.log('Launch URL:', launchURL);

            if (launchURL) {
                Linking.openURL(launchURL);
            }
        };

        OneSignal.Notifications.addEventListener("foregroundWillDisplay", handleNotification)
        OneSignal.Notifications.addEventListener("click", handleNotificationClick);


        return () => {

            OneSignal.Notifications.removeEventListener("foregroundWillDisplay", handleNotification)
            OneSignal.Notifications.removeEventListener("click", handleNotificationClick);

        }

    }, [])


    return (
        <Box flex={1} bg="$gray700">
            <NavigationContainer theme={theme} linking={linking}>
                {user.id ? <AppRoutes/> : <AuthRoutes/>}

                {notification?.title && (
                    <Notification
                        data={notification}
                        onClose={() => setNotification(undefined)}
                    />
                )}
            </NavigationContainer>

        </Box>
    )
}