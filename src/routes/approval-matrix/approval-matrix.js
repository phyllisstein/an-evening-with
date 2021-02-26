import { Impress, Step } from 'components/impress'
import { Entry } from 'components/matrix'
import { Image } from './approval-matrix-styles'
import madge from 'assets/matrix/madge.png'

export const ApprovalMatrix = () => {
  return (
    <>
      <Impress height={ 1024 } width={ 1024 }>
        <Step scale={ 2 } style={{ pointerEvents: 'none' }}/>
        <Step>
          <Entry>
            Madonna
            <Image src={ madge }/>
          </Entry>
        </Step>
        <Step position={{ x: 500, z: -500 }}>
          <Entry>Madge</Entry>
        </Step>
      </Impress>
    </>
  )
}
