import { configureStore, applyMiddleware, compose, combineReducers } from "@reduxjs/toolkit";
import { NativeModules } from 'react-native'
import surveyReducer from "./features/survey/SurveySlice"

const rootReducer = combineReducers({
  survey: surveyReducer,
})
export const store = configureStore({
  reducer: rootReducer,
})

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true)
}

export type RootState = ReturnType<typeof rootReducer>;
