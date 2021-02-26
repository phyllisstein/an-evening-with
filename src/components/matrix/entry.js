import { Root } from './entry-styles'

export const Entry = ({ children, ...props }) => {
    return <Root { ...props }>{ children }</Root>
}
