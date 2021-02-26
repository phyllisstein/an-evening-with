import { Entry } from 'components/matrix'
import { Impress } from 'components/impress'

export const ApprovalMatrix = () => {
    return (
        <>
            <Impress height={ 1024 } width={ 1024 }>
                <Entry>Madonna</Entry>
                <Entry position={{ x: 250 }}>Madge</Entry>
            </Impress>
        </>
    )
}
