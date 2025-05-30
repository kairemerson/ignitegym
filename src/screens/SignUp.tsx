import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import {VStack, Image, Center, Text, Heading, useToast} from "@gluestack-ui/themed"

import { useNavigation } from "@react-navigation/native"

import BackgroundImg from "../assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"
import { useState } from "react"
import { UseAuth } from "@hooks/useAuth"


type FormData = {
    name: string
    email: string
    password: string
    password_confirm: string
}

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome"),
    email: yup.string().required("Informe o email").email("Email inválido"),
    password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
    password_confirm: yup.string().required("Confirme a senha").oneOf([yup.ref("password"), ""], "A confirmação de senha não cofere")
})

export function SignUp() {

    const {signIn} = UseAuth()

    const toast = useToast()
 
    const [isLoading, setIsLoading] = useState(false)

    const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(signUpSchema)
    })

    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSignUp({name, email, password}: FormData) {
        try {
            setIsLoading(true)
            await api.post("/users", {name, email, password})

            await signIn(email, password)

        } catch (error) {
            setIsLoading(false)

            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível criar a conta"

            toast.show({
                placement: "top",
                render: ({id}) => (
                    <ToastMessage id={id} action="error" title={title} onClose={() => toast.close(id)}/>
                )
            })
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

                <Center gap="$2" flex={1}>
                    <Heading color="$gray100">Crie sua conta</Heading>

                    <Controller 
                        control={control}
                        name="name"
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Nome" 
                                onChangeText={onChange} 
                                value={value} 
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />
                   
                    <Controller 
                        control={control}
                        name="email"
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="E-mail" 
                                keyboardType="email-address" 
                                autoCapitalize="none"
                                onChangeText={onChange} 
                                value={value} 
                                errorMessage={errors.email?.message}
                            />
                            
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password"
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Senha" 
                                secureTextEntry
                                onChangeText={onChange} 
                                value={value} 
                                errorMessage={errors.password?.message}

                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password_confirm"
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Confirme a senha" 
                                secureTextEntry
                                onChangeText={onChange} 
                                value={value} 
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="done"
                                errorMessage={errors.password_confirm?.message}
                            />
                            
                        )}
                    />
                    

                    <Button title="Criar e cessar" onPress={handleSubmit(handleSignUp)} isLoading={isLoading}/>
                </Center>

                <Button 
                    title="Voltar para o login" 
                    variant="outline" 
                    mt="$12"
                    onPress={handleGoBack}
                />
                
            </VStack>
        </VStack>
    )
}