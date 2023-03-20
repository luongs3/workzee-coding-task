import { MultiStepSurveyQuestionProps, UserAnswerProps } from "../features/survey/SurveyType";

export const isMatchPreCondition = (
  questions: MultiStepSurveyQuestionProps[],
  currentIndex: number,
  userAnswers: UserAnswerProps[],
): boolean => {
  const previousQuestion = questions[currentIndex - 1]
  const userAnswer = userAnswers.find(userAnswer => userAnswer.questionKey == previousQuestion.key)
  const currentQuestion = questions[currentIndex]

  return currentQuestion.preConditionValue != undefined &&
    currentQuestion.preConditionValue == userAnswer?.answer
}