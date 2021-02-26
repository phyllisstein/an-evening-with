import chroma from 'chroma-js'
import R from 'ramda'

export const js = {
  accent: chroma('#EC2C00'),
  faded: chroma('#767676'),
  teaser: chroma('#949494'),
  text: chroma('#000').alpha(0.87),
  white: chroma('#f9fafb'),
}

export const css = R.map(R.invoker(0, 'css'), js)
