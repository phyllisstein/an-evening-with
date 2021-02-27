import { Impress, Step } from 'components/impress'
import { Entry } from 'components/matrix'
import gtasa from 'assets/matrix/gtasa.jpg'
import { Image } from './approval-matrix-styles'
import madge from 'assets/matrix/madge.png'
import Madge from 'assets/matrix/madge.svg'
import twenty from 'assets/matrix/twenty.jpg'

export const ApprovalMatrix = () => {
  return (
    <>
      <Impress height={ 1024 } width={ 1024 }>
        <Step scale={ 2 } style={{ pointerEvents: 'none' }}/>
        <Step
          position={{ x: -512, z: 256 }}
          scale={ 0.5 }
          style={{ pointerEvents: 'none' }}>
          <Entry>
            <Entry.Text>
              <strong>Madonna</strong>, Oxford student.
            </Entry.Text>
            <Image
              src={ madge }
              style={{ clipPath: `url('#madge_svg__madge')` }}/>
            <Madge/>
          </Entry>
        </Step>
        <Step position={{ x: 250, z: -500 }}>
          <Entry>
            <Entry.Text>
              <strong>MoMA</strong> charges $20.
            </Entry.Text>
            <Image src={ twenty }/>
          </Entry>
        </Step>
        <Step position={{ x: 125, y: 250 }} rotation={{ x: -15, y: -45 }}>
          <Entry>
            <Entry.Text>
              <strong>Grand Theft Auto: San Andreas.</strong> Vroom.
            </Entry.Text>
            <Image src={ gtasa }/>
          </Entry>
        </Step>
      </Impress>
    </>
  )
}
