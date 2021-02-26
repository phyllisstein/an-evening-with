import { DIRECTION_HORIZONTAL, Swipe } from 'hammerjs'
import { useEffect } from 'react'
import { useHammer } from './use-hammer'

export const useSwipe = handler => {
  const mc = useHammer()

  mc.add(new Swipe({ direction: DIRECTION_HORIZONTAL }))

  useEffect(() => {
    mc.on('swipe', handler)

    return () => mc.off('swipe', handler)
  }, [handler])
}
