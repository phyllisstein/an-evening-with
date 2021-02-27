import styled from 'styled-components'

export const EntryText = styled.article`
  ${ ({ theme }) => theme.typeface.primary({ fontSize: 9 }) }

  &&& > strong {
    font-weight: 500;
  }
`
