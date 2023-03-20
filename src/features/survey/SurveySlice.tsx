import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";
import { SurveyStateProps, UserAnswerProps } from "./SurveyType";

const initialState: SurveyStateProps = {
  answeringIndex: 0,
  userAnswers: [],
}

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    addUserAnswer: (state, action: PayloadAction<UserAnswerProps>) => {
      console.log('addUserAnswer action.payload', action.payload)
      const existedUserAnswer = state.userAnswers.find(item => item.questionKey == action.payload.questionKey)
      if (existedUserAnswer !== undefined) {
        existedUserAnswer.answer = action.payload.answer
      } else {
        state.userAnswers.push(action.payload)
      }
    },
    updateUserAnswer: (state, action: PayloadAction<UserAnswerProps>) => {
      state.userAnswers.map(userAnswer => {
        if (userAnswer.questionKey == action.payload.questionKey) {
          userAnswer.answer = action.payload.answer
        }
      })
    },
    updateAnsweringIndex: (state, action: PayloadAction<number>) => {
      state.answeringIndex = action.payload
    },
  },
})

export const addUserAnswer = surveySlice.actions.addUserAnswer;
export const updateUserAnswer = surveySlice.actions.updateUserAnswer;
export const updateAnsweringIndex = surveySlice.actions.updateAnsweringIndex;
export default surveySlice.reducer;
