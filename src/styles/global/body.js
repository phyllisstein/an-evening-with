import { createGlobalStyle } from 'styled-components'

export const Body = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;

    outline: none;

    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  html {
    box-sizing: border-box;

    color: ${ ({ theme }) => theme.palette.css.text };
    font: 31.25%/1.333 sans-serif;

    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    font-variant-numeric: oldstyle-nums proportional-nums;
  }

  body {
    ${ ({ theme }) => theme.typeface.primary() }

    color: ${ ({ theme }) => theme.palette.css.text };
  }
`
