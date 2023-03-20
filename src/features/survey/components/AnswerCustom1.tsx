import { View, TextInput } from "react-native"

function AnswerCustom1({ value, onChange }: { value: any, onChange: Function }) {
  return (
    <View>
      <TextInput
        multiline
        maxLength={1255}
        autoCorrect={false}
        onChangeText={text => onChange(text)}
        value={value}
        placeholder="Enter your answer"
        blurOnSubmit
      />
    </View>
  )
}

export default AnswerCustom1