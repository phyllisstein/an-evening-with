import styled from 'styled-components'

export const Root = styled.button`
  display: block;
  padding: 2rem;

  color: ${ ({ theme, themeColor }) =>
    theme.palette.js[themeColor].luminance() >= 0.5
    ? theme.palette.css.black
    : theme.palette.css.white };
  text-align: center;

  background-color: ${ ({ theme, themeColor }) => theme.palette.css[themeColor] };
  border: none;

  ${ ({ theme }) => theme.animation({ properties: ['background-color'] }) }

  border-radius: 5px;
  outline: 0;
  box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:hover {
    background-color: ${ ({ theme, themeColor }) =>
      theme.palette.js[themeColor].set('hsl.h', '+15') .darken(1) .css() };
    outline: 0;
  }
`
