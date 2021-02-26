import { useCallback, useEffect } from 'react'
import _ from 'lodash'
import { impress } from 'state'
import { oneLine } from 'common-tags'
import { Root } from './step-styles'
import { useNavigate } from 'react-router'
import { useRecoilState } from 'recoil'
import { useStep } from 'hooks/impress'

const COORDINATE_DEFAULTS = {
    x: 0,
    y: 0,
    z: 0,
}

export const Step = ({
    children,
    position = {},
    relative = false,
    rotation = {},
    scale = 1,
    step,
    style,
}) => {
    const [{ previous }, setCurrentAndPreviousAnimation] = useRecoilState(
        impress.currentAndPreviousAnimation(step),
    )
    const [currentStep] = useStep()

    const nextPosition = _.defaults({ ...position }, COORDINATE_DEFAULTS)
    const nextRotation = _.defaults({ ...rotation }, COORDINATE_DEFAULTS)
    let nextScale = scale

    if (relative) {
        nextPosition.x += previous?.position?.x ?? 0
        nextPosition.y += previous?.position?.y ?? 0
        nextPosition.z += previous?.position?.z ?? 0
        nextRotation.x += previous?.rotation?.x ?? 0
        nextRotation.y += previous?.rotation?.y ?? 0
        nextRotation.z += previous?.rotation?.z ?? 0
        nextScale *= previous?.scale ?? 1
    }

    const transform = oneLine`
        translate(-50%, -50%)
        translate3d(${ nextPosition.x }px, ${ nextPosition.y }px, ${ nextPosition.z }px)
        rotateX(${ nextRotation.x }deg)
        rotateY(${ nextRotation.y }deg)
        rotateZ(${ nextRotation.z }deg)
        scale(${ nextScale })
    `

    useEffect(() => {
        setCurrentAndPreviousAnimation({
            current: {
                position: nextPosition,
                rotation: nextRotation,
                scale: nextScale,
            },
        })
    }, [transform])

    const navigate = useNavigate()
    const jumpToStep = useCallback(() => {
        console.log({ step, currentStep })

        if (step === currentStep) {
            navigate('../')
        } else {
            navigate(`../${ step }`)
        }
    }, [currentStep, step])

    return (
        <Root
            animate={{ opacity: step === currentStep ? 1 : 0.3 }}
            style={{
                ...style,
                transform,
            }}
            onClick={ jumpToStep }>
            { children }
        </Root>
    )
}
