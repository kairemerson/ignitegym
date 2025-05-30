
import {VStack, Image, Center, Text, Heading, useToast} from "@gluestack-ui/themed"
import { Controller, useForm } from "react-hook-form"

import {useNavigation} from "@react-navigation/native"

import {AuthnavigatorRoutesProps} from "@routes/auth.routes"

import BackgroundImg from "../assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { UseAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"
import { useState } from "react"

type FormData = {
    email: string
    password: string
}

export function SignIn() {

    const [isLoading, setIsLoading] = useState(false)

    const {signIn} = UseAuth()

    const toast = useToast()

    const navigation = useNavigation<AuthnavigatorRoutesProps>()

    const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

    function handleNewAccount() {
        navigation.navigate("signUp")
    }

    async function handleSignIn({email, password}: FormData) {
        try {
            setIsLoading(true)
            await signIn(email, password)
            
        } catch (error) {
            const isAppError = error instanceof AppError

            const title = isAppError ? error.message : "Não foi possível entrar, tente novamente"

            toast.show({
                placement: "top",
                render: ({id})=> (
                    <ToastMessage id={id} action="error" title={title} onClose={()=> toast.close(id)}/>
                )
            })
            setIsLoading(false)
        } finally{
            setIsLoading(false)
        }
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

                    <Controller
                        control={control}
                        name="email"
                        rules={{required: "Informe o email"}}
                        render={({field: {onChange}})=> (
                            <Input placeholder="e-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={onChange} errorMessage={errors.email?.message}/>

                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{required: "Informe a senha"}}
                        render={({field: {onChange}})=> (
                            <Input placeholder="senha" secureTextEntry onChangeText={onChange} errorMessage={errors.password?.message}/>

                        )}
                    />



                    <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading}/>
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