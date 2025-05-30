import { OneSignal } from "react-native-onesignal"

type addTagsProps = {
  userName: string
  email: string
}

export function tagUserInfo({ userName, email }: addTagsProps) {
  OneSignal.User.addTags({
    user_name: userName,
    user_email: email,
  })
  
}

export function tagLastExerciseHistory(exercise: string) {
  OneSignal.User.addTag('last_exercise', exercise)
}

export function tagLastExerciseHistoryTime() {

  const today = new Date()
  const formattedDate = today.toLocaleDateString("pt-BR")
  OneSignal.User.addTag('last_exerciseTime', formattedDate)
}

export function tagWeeklyExercisesAmount(amount: number) {
  OneSignal.User.addTag('weekly_exercises_amount', amount.toString())
}