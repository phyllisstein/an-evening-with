import _ from 'lodash'
import { oneLine } from 'common-tags'
import { Root } from './layout-styles'

const COORDINATE_DEFAULTS = {
  x: 0,
  y: 0,
  z: 0,
}

export const Layout = ({
  children,
  position = {},
  rotation = {},
  scale = 1,
}) => {
  const positionWithDefaults = _.defaults(position, COORDINATE_DEFAULTS)
  const rotationWithDefaults = _.defaults(rotation, COORDINATE_DEFAULTS)

  const transform = oneLine`
        translate(-50%, -50%)
        translate3d(${ positionWithDefaults.x }px, ${ positionWithDefaults.y }px, ${ positionWithDefaults.z }px)
        rotateX(${ rotationWithDefaults.x }deg)
        rotateY(${ rotationWithDefaults.y }deg)
        rotateZ(${ rotationWithDefaults.z }deg)
        scale(${ scale })
    `

  return <Root style={{ transform }}>{ children }</Root>
}
