import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { SErrorText } from "../../common/SComponents"
import { MultiStepSurveyQuestionProps } from "../SurveyType"
import Answer from "./Answer"
import AnswerCustom1 from "./AnswerCustom1"

function Question({ question, userAnswer, setValue, errorText }: { question: MultiStepSurveyQuestionProps, userAnswer: any, setValue: Function, errorText: string }) {
  return (
    <View>
      <Text>{question.questionText}</Text>
      {question.answerComponent != undefined ?
        <AnswerCustom1 value={userAnswer} onChange={setValue} /> :
        <Answer answer={question.answers!} type={question.type} setUserAnswer={setValue} userAnswer={userAnswer} />
      }
      <SErrorText>{errorText}</SErrorText>
    </View>
  )
}

export default Question