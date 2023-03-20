import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { SMainContainer } from "../common/SComponents";
import Question from "./components/Question"
import { addUserAnswer, updateAnsweringIndex } from "./SurveySlice";
import type { MultiStepSurveyQuestionProps, SurveyRouteProps, UserAnswerProps } from "./SurveyType"

function SurveyScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const answeringIndex = useSelector((state: RootState) => state.survey.answeringIndex)
  const userAnswers = useSelector((state: RootState) => state.survey.userAnswers)

  const { questions }: { questions: MultiStepSurveyQuestionProps[] } = require('../../questions.json');
  const question = questions[answeringIndex]
  const answerInitValue = getAnswerInitState(question, userAnswers)
  let [userAnswer, setUserAnswer] = useState(answerInitValue)
  let [errorText, setErrorText] = useState('')
  useEffect(() => { setErrorText('') }, [userAnswer])
  function setValue(value: any) {
    setUserAnswer(value)
    const isValid = checkValid(question, value)
    isValid ? setErrorText('') : setErrorText('Not valid')
  }

  useEffect(() => {
    const answerInitValue = getAnswerInitState(question, userAnswers)
    setUserAnswer(answerInitValue)
  }, [question.key])

  function onPressNext(nextAnsweringIndex: number) {
    const question = questions[nextAnsweringIndex - 1]
    const isValid = checkValid(question, userAnswer)
    isValid ? setErrorText('') : setErrorText('Not valid')
    if (!isValid) {
      return
    }

    dispatch(addUserAnswer({ questionKey: question.key, answer: userAnswer }))
    if (nextAnsweringIndex === questions.length) {
      navigation.setOptions({})
      navigation.navigate('Summary' as never)
      return
    }

    const nextQuestion = questions[nextAnsweringIndex]
    const oldUserAnswer = userAnswers.find(userAnswer => userAnswer.questionKey == nextQuestion?.key)?.answer

    if (nextQuestion?.preConditionValue != undefined && userAnswer != nextQuestion.preConditionValue) {
      nextAnsweringIndex += 1
    }

    const params = route.params as SurveyRouteProps
    if (params && params.from === 'Summary') {
      const shouldNext = shouldNextToQuestion(nextQuestion, oldUserAnswer, userAnswer)
      if (!shouldNext) {
        navigation.navigate('Summary' as never)
        return
      }
    }

    navigation.setOptions({})
    dispatch(updateAnsweringIndex(nextAnsweringIndex))
  }

  function onPressBack(previousAnsweringIndex: number) {
    navigation.setOptions({})
    dispatch(updateAnsweringIndex(previousAnsweringIndex))
  }

  function onPressSkip(nextAnsweringIndex: number) {
    navigation.setOptions({})
    if (nextAnsweringIndex === questions.length) {
      navigation.navigate('Summary' as never)
      return
    }

    dispatch(updateAnsweringIndex(nextAnsweringIndex))
  }

  return (
    <SMainContainer>
      <View style={styles.main}>
        <Question question={question} userAnswer={userAnswer} setValue={setValue} errorText={errorText} />
      </View>
      <View style={styles.navigation}>
        <View style={answeringIndex == 0 && styles.hidden}>
          <Button
            title="Back"
            onPress={() => onPressBack(answeringIndex - 1)}
          />
        </View>
        {question.skipable &&
          <View>
            <Button
              title="Skip"
              onPress={() => onPressSkip(answeringIndex + 1)}
            />
          </View>}
        <View>
          <Button
            title="Next"
            onPress={() => onPressNext(answeringIndex + 1)}
          />
        </View>
      </View>
    </SMainContainer>
  )
}

function getAnswerInitState(question: MultiStepSurveyQuestionProps, userAnswers: UserAnswerProps[]): any {
  const userAnswer = userAnswers.find(item => item.questionKey == question.key)
  if (userAnswer !== undefined) {
    return userAnswer.answer
  }

  return question.initialValue
}

function shouldNextToQuestion(nextQuestion: MultiStepSurveyQuestionProps, oldUserAnswer: any, userAnswer: any): boolean {
  return nextQuestion.preConditionValue != undefined &&
    oldUserAnswer != userAnswer &&
    userAnswer == nextQuestion.preConditionValue
}

function checkValid(question: MultiStepSurveyQuestionProps, value: any): boolean {
  if (question.isValid != undefined) {
    const isValid = getValidator(question.isValid)
    return isValid(value)
  }

  return true
}

function getValidator(validatorName: string): Function {
  const notEmpty = function (value: any): boolean { if (value == undefined || value == '') { return false; } return true; }
  return notEmpty
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  main: {
    height: 400,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.75)',
    marginBottom: 20,
  },
  hidden: {
    height: 0,
  },
})

export default SurveyScreen