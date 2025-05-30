import { useCallback, useEffect, useState } from "react";
import { SectionList } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { ToastMessage } from "@components/ToastMessage";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { Loading } from "@components/Loading";
import { tagWeeklyExercisesAmount } from "../notifications/notificationsTags";

type RouteParamsProps = {
  createWeekExercisesAmount?: boolean
}

export function History() {

    const toast = useToast()

    const route = useRoute()
    const params = route.params as RouteParamsProps

    const [isLoading, setIsLoading] = useState(true)

    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])


    async function  fetchHistory() {
        try {
            setIsLoading(true)

            const response = await api.get("/history")
            setExercises(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível carregar o histórico"

            toast.show({
                placement: "top",
                render: ({id})=> (
                    <ToastMessage id={id} action="error" title={title} onClose={()=> toast.close(id)}/>
                )

            })
        }finally {
            setIsLoading(false)
        }
    }


    useFocusEffect(useCallback(()=> {
        fetchHistory()
    }, []))

    useEffect(() => {
        if (params?.createWeekExercisesAmount && exercises) {
            
            const amount = exercises.reduce((total, exercise) => {
                return total + (exercise.data?.length || 0);
            }, 0);

            tagWeeklyExercisesAmount(amount)
        }
    }, [exercises, params])

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de exercícios"/>
            {isLoading ? <Loading/> : (
                <SectionList
                    sections={exercises}
                    keyExtractor={(item)=> item.id}
                    renderItem={({item})=> <HistoryCard data={item}/>}
                    renderSectionHeader={({section})=> (
                        <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3" fontFamily="$heading">{section.title}</Heading>
                    )}
                    style={{paddingHorizontal: 16}}
                    contentContainerStyle={
                        exercises.length === 0 && {flex: 1, justifyContent: "center"}
                    }
                    ListEmptyComponent={()=> (
                        <Text color="$gray100" textAlign="center">
                            Não há exercícios registrados ainda. {"\n"} Vamos fazer exercícios hoje?
                        </Text>
                    )}
                    showsVerticalScrollIndicator={false}
                />

            )}
            
        </VStack>
    )
}