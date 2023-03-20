import { StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SMainContainer, STextQuestionGoBack } from "../common/SComponents";
import type { MultiStepSurveyQuestionProps } from "../survey/SurveyType"
import type { RootState } from '../../store'
import { updateAnsweringIndex } from "../survey/SurveySlice";
import { isMatchPreCondition } from "../../utils/common";

function SummaryScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { questions }: { questions: MultiStepSurveyQuestionProps[] } = require('../../questions.json');
  const userAnswers = useSelector((state: RootState) => state.survey.userAnswers)
  function goBackQuestion(questionKey: string) {
    const nextAnsweringIndex = questions.findIndex(item => item.key == questionKey)
    dispatch(updateAnsweringIndex(nextAnsweringIndex))
    navigation.navigate('Survey' as never, { questionKey: questionKey, from: 'Summary' } as never)
  }

  return (
    <SMainContainer>
      <ScrollView>
        {questions.map((question, index) => {
          if (question.preConditionValue !== undefined) {
            const isMatched = isMatchPreCondition(questions, index, userAnswers)
            if (!isMatched) { return }
          }

          return (
            <View key={question.key} style={styles.questionSection}>
              <STextQuestionGoBack onPress={() => goBackQuestion(question.key)}>{index + 1} .{question.questionText}</STextQuestionGoBack>
              <Text>{userAnswers.find(item => item.questionKey == question.key)?.answer}</Text>
            </View>
          )
        })}
      </ScrollView>
    </SMainContainer>
  )
}

const styles = StyleSheet.create({
  questionSection: {
    marginTop: 10
  }
})

export default SummaryScreen