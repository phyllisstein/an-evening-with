import { Body, Canvas, Root } from './impress-styles'
import { useEffect, useRef, useState } from 'react'
import { useStep, useSteppedChildren } from 'hooks/impress'
import { addEventListener } from 'consolidated-events'
import { canUseDOM } from 'exenv'
import { impress } from 'state'
import R from 'ramda'
import { useRecoilValue } from 'recoil'

const getWindowScale = (height, width, scaleConstraints = {}) => {
  if (!canUseDOM) {
    return 1
  }

  const scaleHeight = window.innerHeight / height
  const scaleWidth = window.innerWidth / width
  const scaleWindow = scaleHeight > scaleWidth ? scaleWidth : scaleHeight

  if (scaleConstraints.max != null && scaleWindow > scaleConstraints.max) {
    return scaleConstraints.max
  }

  if (scaleConstraints.min != null && scaleWindow < scaleConstraints.min) {
    return scaleConstraints.min
  }

  return scaleWindow
}

export const Impress = ({
  children,
  height,
  perspective: perspectiveBase = 1000,
  scale: scaleConstraints = {},
  width,
}) => {
  width ??= canUseDOM && window.innerWidth
  height ??= canUseDOM && window.innerHeight

  const [windowScale, setWindowScale] = useState(() =>
    getWindowScale(height, width, scaleConstraints),
  )
  const [steppedChildren, stepCount] = useSteppedChildren(children)
  const [step] = useStep(stepCount)
  const previousScale = useRef(0)

  const current = useRecoilValue(impress.animation(step))

  const targetPosition = R.map(R.multiply(-1), current.position)
  const targetRotation = R.map(R.multiply(-1), current.rotation)
  const targetScale = 1 / current.scale

  useEffect(() => {
    const getScale = () => {
      const nextScale = getWindowScale(height, width, scaleConstraints)
      if (nextScale !== windowScale) {
        setWindowScale(nextScale)
      }
    }

    getScale()

    return addEventListener(window, 'resize', getScale, { passive: true })
  }, [])

  const zoom = targetScale >= previousScale.current
  previousScale.current = targetScale
  const perspective = perspectiveBase / targetScale

  return (
    <>
      <Body/>
      <Root
        animate={{
          perspective,
          scale: targetScale * windowScale,
        }}
        initial={{
          perspective: perspectiveBase,
          scale: windowScale,
        }}
        transition={{
          delay: zoom ? 0.5 : 0,
          duration: 1,
          type: 'tween',
        }}>
        <Canvas
          animate={{
            rotateX: targetRotation.x,
            rotateY: targetRotation.y,
            rotateZ: targetRotation.z,
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
          }}
          initial={{
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            x: 0,
            y: 0,
            z: 0,
          }}
          transformTemplate={ ({ rotateX, rotateY, rotateZ, x, y, z }) =>
            `translate3d(${ x }, ${ y }, ${ z }) rotateZ(${ rotateZ }) rotateY(${ rotateY }) rotateX(${ rotateX })` }
          transition={{
            delay: zoom ? 0 : 0.5,
            duration: 1,
            type: 'tween',
          }}>
          { steppedChildren }
        </Canvas>
      </Root>
    </>
  )
}
