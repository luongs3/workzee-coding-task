import { useState } from "react";
import { View, Text } from "react-native"
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { AnswerProps } from "../SurveyType"


function AnswerRadio({ answers, userAnswer, setUserAnswer }: { answers: AnswerProps[], userAnswer: any, setUserAnswer: Function }) {
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(answers);
  if (userAnswer != undefined && userAnswer != '') {
    radioButtons.map(radioButton => {
      if (radioButton.value == userAnswer) {
        radioButton.selected = true
      } else {
        radioButton.selected = false
      }
    })
  }

  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
    radioButtonsArray.map(button => {
      if (button.selected) {
        setUserAnswer(button.value)
      }
    })
  }

  return (
    <View>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={onPressRadioButton}
      />
    </View>
  )
}

export default AnswerRadio