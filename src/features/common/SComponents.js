import styled from 'styled-components'
import theme from '../../config/theme'

export const SSFText = styled.Text`
  font-size: ${props => props.fontSize || 14}px
`

export const STextQuestionGoBack = styled(SSFText)`
  font-size: 14px
  color: #474747
  text-decoration-line: underline
`
export const SErrorText = styled(SSFText)`
  color: #a31208
`

export const SMainContainer = styled.View`
  flex: 1
  margin: 10px
`