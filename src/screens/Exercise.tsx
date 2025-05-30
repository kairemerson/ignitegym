import { Box, Center, Heading, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitiosSvg from "@assets/repetitions.svg"
import { Button } from "@components/Button";
import { ScrollView } from "@gluestack-ui/themed";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { useToast } from "@gluestack-ui/themed";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Image } from "expo-image";
import { Loading } from "@components/Loading";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { tagLastExerciseHistory, tagLastExerciseHistoryTime } from "../notifications/notificationsTags";

type RoutesParamsProps = {
    exerciseId: string
}

export function Exercise() {
    const [sendingRegister, setSendingRegister] = useState(false)
    const [isLoaiding, setIsLoading] = useState(true)
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    
    const toast = useToast()
    const route = useRoute()

    const {exerciseId} = route.params as RoutesParamsProps

    function handleGoBack() {
        navigation.goBack()
    }

    async function fetchExercisesDetails() {
        try {
            setIsLoading(true)
            const response = await api.get(`/exercises/${exerciseId}`)
            setExercise(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível carregar os detalhes do exercício"

            toast.show({
                placement: "top",
                render: ({id})=> (
                    <ToastMessage id={id} action="error" title={title} onClose={()=> toast.close(id)}/>
                )

            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setSendingRegister(true)

            await api.post("/history", {exercise_id: exerciseId})

            tagLastExerciseHistory(exercise.name)
            tagLastExerciseHistoryTime()

            toast.show({
                placement: "top",
                render: ({id})=> (
                    <ToastMessage id={id} action="success" title="Parabéns! Exercício registrado no histórico" onClose={()=> toast.close(id)}/>
                )

            })

            navigation.navigate("history", { createWeekExercisesAmount: true })

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível registrar o exercício"

            toast.show({
                placement: "top",
                render: ({id})=> (
                    <ToastMessage id={id} action="error" title={title} onClose={()=> toast.close(id)}/>
                )

            })
        }finally {
            setSendingRegister(false)
        }
    }

    useEffect(()=>{
        fetchExercisesDetails()
    }, [exerciseId])

    return (
        <VStack flex={1}>
            <VStack px="$8" bg="$gray600" pt="$12">
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={ArrowLeft} color="$green500" size="xl"/>
                </TouchableOpacity>

                <HStack justifyContent="space-between" alignItems="center" mt="$4" mb="$8">
                    <Heading color="$gray100" fontFamily="$heading" fontSize="$lg" flexShrink={1}>{exercise.name}</Heading>

                    <HStack alignItems="center">
                        <BodySvg/>
                        <Text color="$gray100" ml="$1" textTransform="capitalize">{exercise.group}</Text>
                    </HStack>
                </HStack>
            </VStack>


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                    paddingBottom: 32
                }}>
                
                {isLoaiding ? <Loading/> : (
                    <VStack p="$8">
                        <Box rounded="$lg" mb="$3" overflow="hidden">
                            <Image
                                source={{uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}} 
                                alt="exercicio"
                                contentFit="cover"
                                style={{width: "100%", height: 320, borderRadius: 8}}
                            />

                        </Box>

                        <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                            <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
                                <HStack>
                                    <SeriesSvg/>
                                    <Text color="$gray200" ml="$2">{exercise.series} séries</Text>
                                </HStack>

                                <HStack>
                                    <RepetitiosSvg/>
                                    <Text color="$gray200" ml="$2">{exercise.repetitions} repetições</Text>
                                </HStack>
                            </HStack>

                            <Button title="Marcar como realizado" isLoading={sendingRegister} onPress={handleExerciseHistoryRegister}/>
                        </Box>

                    </VStack>

                )}
            </ScrollView>

        </VStack>
    )
}