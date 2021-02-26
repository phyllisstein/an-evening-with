import { css } from 'styled-components'

export function animation({
  curve = 'standard',
  duration = 'entering',
  properties = ['all'],
} = {}) {
  const durationMS = animation.duration[duration]
  const curveBezier = animation.curve[curve]
  const property = Array.isArray(properties) ? properties.join(',') : properties

  return css`
    transition: ${ property } ${ durationMS }ms ${ curveBezier };
  `
}

// Q.v. <https://github.com/angular/components/blob/master/src/material/core/animation/animation.ts#L20-L22>.
animation.duration = {
  complex: 375,
  elevation: 280,
  entering: 225,
  exiting: 195,
  swiftIn: 300,
  swiftInOut: 500,
  swiftLinear: 80,
  swiftOut: 400,
}

// Q.v. <https://github.com/angular/components/blob/master/src/material/core/animation/animation.ts#L11-L14>.
// Q.v. <https://github.com/angular/components/blob/master/src/material/core/style/_variables.scss#L24-L44>.
animation.curve = {
  materialAcceleration: 'cubic-bezier(0.4, 0, 1, 1)',
  materialDeceleration: 'cubic-bezier(0, 0, 0.2, 1)',
  materialSharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  materialStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  swiftIn: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
  swiftInOut: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
  swiftLinear: 'linear',
  swiftOut: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
}
