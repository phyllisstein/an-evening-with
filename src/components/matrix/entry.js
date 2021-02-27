import { EntryText } from './entry-text'
import { Root } from './entry-styles'

export const Entry = ({ children }) => {
  return <Root>{ children }</Root>
}

Entry.Text = EntryText
