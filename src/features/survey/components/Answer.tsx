import { View, Text, TextInput } from "react-native"
import { AnswerProps, AnswerType } from "../SurveyType"
import AnswerRadio from "./AnswerRadio"

function Answer({ answer, type, userAnswer, setUserAnswer }: { answer: any, type: AnswerType, userAnswer: any, setUserAnswer: Function }) {
  function onChange(text: string) {
    setUserAnswer(text)
  }

  if (type === AnswerType.plaintext) {
    return (
      <View>
        <TextInput
          multiline
          maxLength={1255}
          autoCorrect={false}
          onChangeText={text => onChange(text)}
          value={userAnswer}
          placeholder="Enter your answer"
          blurOnSubmit
        />
      </View>
    )
  }

  return (
    <AnswerRadio answers={answer} userAnswer={userAnswer} setUserAnswer={setUserAnswer} />
  )
}

export default Answer