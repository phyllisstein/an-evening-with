import { useEffect, useRef } from 'react'
import { Manager } from 'hammerjs'

export const useHammer = target => {
  const mc = useRef(
    new Manager(target ?? document.body, {
      recognizers: [],
    }),
  )

  useEffect(() => {
    mc.current.set({ enable: true })

    return () => mc.current.destroy()
  }, [''])

  return mc.current
}
