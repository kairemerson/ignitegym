
import {VStack, Image, Center, Text, Heading} from "@gluestack-ui/themed"

import {useNavigation} from "@react-navigation/native"

import {AuthnavigatorRoutesProps} from "@routes/auth.routes"

import BackgroundImg from "../assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

export function SignIn() {

    const navigation = useNavigation<AuthnavigatorRoutesProps>()

    function handleNewAccount() {
        navigation.navigate("signUp")
    }

    return (
        <VStack flex={1}>
            <Image 
                source={BackgroundImg} 
                alt="pessoas treinando"
                w="$full"
                h={624}
                defaultSource={BackgroundImg}
                position="absolute"
            />
            <VStack flex={1} px="$10" pb="$16">
                <Center my="$20">
                    <Logo/>
                    <Text color="$gray100" fontSize="$sm">
                        Treine sua mente e o seu corpo.
                    </Text>
                </Center>

                <Center gap="$2">
                    <Heading color="$gray100">Acesse a conta</Heading>

                    <Input placeholder="e-mail" keyboardType="email-address" autoCapitalize="none"/>

                    <Input placeholder="senha" secureTextEntry/>

                    <Button title="Acessar"/>
                </Center>

                <Center flex={1} justifyContent="flex-end" mt="$4">
                    <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">Ainda não tem cadastro?</Text>
                    <Button 
                        title="Criar conta" 
                        variant="outline"
                        onPress={handleNewAccount}
                    />
                </Center>

            </VStack>
        </VStack>
    )
}