import { atom, atomFamily, selectorFamily } from 'recoil'

export const animation = atomFamily({
  default: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    relative: false,
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: 1,
    step: 0,
  },
  key: 'impress:animation',
})

export const currentAndPreviousAnimation = selectorFamily({
  get: step => ({ get }) => {
    const current = get(animation(step))
    const previous = get(animation(step - 1))
    return { current, previous }
  },
  key: 'impress:current-and-previous-animation',
  set: step => ({ get, set }, newValue) => {
    if (newValue.current != null) {
      set(animation(step), newValue.current)
    }

    if (newValue.previous != null) {
      set(animation(step - 1), newValue.previous)
    }
  },
})
