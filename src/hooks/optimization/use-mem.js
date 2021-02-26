import { useCallback, useRef } from 'react'
import DeepWeakMap from 'deep-weak-map'
import mem from 'mem'
import R from 'ramda'

export const useMem = cb => {
  const cache = useRef(new DeepWeakMap())
  return useCallback(mem(cb, { cache: cache.current, cacheKey: R.identity }), [
    cb,
  ])
}
