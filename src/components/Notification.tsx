
import { HStack, Icon, Text } from '@gluestack-ui/themed'
import { Pressable } from '@gluestack-ui/themed'
import { BellRing, X } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { OSNotification } from 'react-native-onesignal'

import * as Linking from 'expo-linking'

type Props = {
  data: OSNotification
  onClose: () => void
}

export function Notification({ data, onClose }: Props) {

  function handleOnPress() {
    console.log(data.launchURL);
    
    if (data.launchURL) {
      Linking.openURL(data.launchURL)
      onClose()
    }
  }

  return (
    <Pressable
      w="$full"
      p={16}
      pt={50}
      bgColor="$gray200"
      position="absolute"
      top={0}
      onPress={handleOnPress}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Icon
          as={BellRing}
          color="black"
          mr={5}
        />

        <Text fontSize="$md" color="black" flex={1}>
          {data.title}
        </Text>

        <TouchableOpacity onPress={onClose}>
            <X/>
        </TouchableOpacity>
          
          
      </HStack>
      
    </Pressable>
  )
}