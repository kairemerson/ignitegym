import { Heading, HStack, Icon, Image, Text, VStack } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps

export function ExerciseCard({...rest}: Props) {
    return (
        <TouchableOpacity {...rest}>

            <HStack 
                bg="$gray500"
                alignItems="center"
                p="$2"
                pr="$4"
                rounded="$md"
                mb="$3"
                >
                <Image 
                    source={{uri: 'https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp'}}
                    alt="imagem do exercicio"
                    w="$16"
                    h="$16"
                    rounded="$md"
                    mr="$4"
                    resizeMode="cover"
                    />

                <VStack flex={1}>
                    <Heading color="$white" fontSize="$lg" fontFamily="$heading">Puxada Frontal</Heading>
                    <Text color="$gray200" fontSize="$sm" mt="$1" numberOfLines={2}>3 séries de 12 repetições</Text>
                </VStack>

                <Icon as={ChevronRight} color="$gray300"/>
            </HStack>
        </TouchableOpacity>
    )
}