import { Tap } from 'hammerjs'
import { useEffect } from 'react'
import { useHammer } from './use-hammer'

export const useTap = handler => {
  const mc = useHammer()

  mc.add(new Tap())

  useEffect(() => {
    mc.on('tap', handler)

    return () => mc.off('tap', handler)
  }, [handler])
}
