export type AllSurveyValuesProps = {
  [key: string]: any;
};
export type AnswerProps = {
  id: string
  label: string;
  value: any;
}
export enum AnswerType {
  radio = 'radio',
  checkbox = 'checkbox',
  plaintext = 'plaintext',
}
export type MultiStepSurveyQuestionProps = {
  key: string;
  questionText: string;
  descriptionText?: string;
  initialValue?: any;
  type: AnswerType;
  preConditionValue?: any;
  answerComponent?: string;
  // if no custom answer component - list of checkboxes/radios:
  answers?: AnswerProps[];
  summaryComponent?: React.ComponentType<{
    value: any;
  }>;
  skipable?: boolean;
  isPresent?: (values: AllSurveyValuesProps) => boolean;
  isValid?: string;
};

export type SurveyStateProps = {
  answeringIndex: number;
  userAnswers: UserAnswerProps[];
}

export type UserAnswerProps = {
  questionKey: string;
  answer: any;
}

export type SurveyRouteProps = {
  questionKey: string;
  from: string;
}