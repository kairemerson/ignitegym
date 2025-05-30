import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Heading, HStack, Text, useToast, VStack} from "@gluestack-ui/themed";

import { api } from "@services/api";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ToastMessage } from "@components/ToastMessage";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";


export function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<string[]>([])
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])
    const [groupSelected, setGroupSelected] = useState("antebraço")

    const toast = useToast()
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate("exercise", {exerciseId})
    }

    async function fetchGroups() {
        try {
            const response = await api.get("/groups")
            setGroups(response.data)
            
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares"

            toast.show({
                placement: "top",
                render: ({id})=> (
                    <ToastMessage id={id} action="error" title={title} onClose={()=> toast.close(id)}/>
                )

            })
        }
    }

    async function fetchExercisesByGrup() {
        try {
            setIsLoading(true)
            const response = await api.get(`/exercises/bygroup/${groupSelected}`) 
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível carregar os exercícios"

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

    useEffect(()=> {
        fetchGroups()
    }, [])

    useFocusEffect(useCallback(()=> {
        fetchExercisesByGrup()
    }, [groupSelected]))

    return (
        <VStack flex={1}>
            <HomeHeader/>

            <FlatList
                data={groups}
                keyExtractor={(item)=> item}
                renderItem={({item})=> (
                    <Group 
                        name={item}
                        isActive={groupSelected === item}
                        onPress={()=> setGroupSelected(item)}
                    />

                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 16}}
                style={{marginVertical: 40, maxHeight: 44, minHeight: 44}}
            />

            {isLoading ? <Loading/> : 
                <VStack px="$8" flex={1}>
                    <HStack justifyContent="space-between" alignItems="center" mb="$5">
                        <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
                        <Text color="$gray200" fontSize="$sm" fontFamily="$body">{exercises.length}</Text>
                    </HStack>

                    <FlatList 
                        data={exercises}
                        keyExtractor={(item)=> item.id}
                        renderItem={({item})=> (
                            <ExerciseCard onPress={()=> handleOpenExerciseDetails(item.id)} data={item}/>

                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 20}}
                    />
                </VStack>
            }
        </VStack>
    )
}