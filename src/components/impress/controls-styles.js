import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

export const Icon = styled(FontAwesomeIcon)`
  font-size: ${ ({ theme }) => theme.scale.css(3) };
`

export const Root = styled.div`
  position: fixed;
  top: 0;
  left: 50%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  transform: translateX(-50%);
`
