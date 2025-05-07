
import {VStack, Image, Center, Text, Heading} from "@gluestack-ui/themed"

import BackgroundImg from "../assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

export function SignUp() {
    return (
        <VStack flex={1} bg="$gray700">
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

                <Center gap="$2" flex={1}>
                    <Heading color="$gray100">Crie sua conta</Heading>

                    <Input placeholder="Nome" />

                    <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none"/>

                    <Input placeholder="Senha" secureTextEntry/>

                    <Button title="Criar e cessar"/>
                </Center>

                <Button title="Voltar para o login" variant="outline" mt="$12"/>
                
            </VStack>
        </VStack>
    )
}