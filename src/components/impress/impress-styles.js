import styled, { createGlobalStyle } from 'styled-components'
import { motion } from 'framer-motion'

export const Body = createGlobalStyle`
        body {
          height: 100vh;
          overflow: hidden;
          width: 100vw;
        }
`

export const Canvas = styled(motion.div)`
  position: absolute;

  transform-origin: left top;
  transform-style: preserve-3d;

  will-change: transform;
`

export const Root = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform-origin: left top;
  transform-style: preserve-3d;

  will-change: perspective, transform;
`
