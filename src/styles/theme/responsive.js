import { css } from 'styled-components'
import { pxToRem } from 'styled-media-query'

const breakpoints = pxToRem(
  {
    lg: '1056px',
    max: '1584px',
    md: '672px',
    sm: '320px',
    xlg: '1312px',
  },
  16,
)

export const between = (start, end, style) => css`
  @media screen and (min-width: ${ breakpoints[
  start
  ] }) and (max-width: ${ breakpoints[end] }) {
    ${ style }
  }
`

export const greaterThan = (breakpoint, style) => css`
  @media screen and (min-width: ${ breakpoints[breakpoint] }) {
    ${ style }
  }
`

export const lessThan = (breakpoint, style) => css`
  @media screen and (max-width: ${ breakpoints[breakpoint] }) {
    ${ style }
  }
`
