import { Root } from './button-styles'

export const Button = ({ children, className, color = 'faded', ...props }) => {
  return (
    <Root className={ className } themeColor={ color } { ...props }>
      { children }
    </Root>
  )
}
