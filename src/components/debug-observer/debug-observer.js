import { oneLine } from 'common-tags'
import { useEffect } from 'react'
import { useRecoilSnapshot } from 'recoil'

const groupStyle = oneLine`
    color: #7F4788;
    font-family: -apple-system,BlinkMacSystemFont,sans-serif;
    font-weight: 700;
`

const timestampStyle = oneLine`
    color: rgba(126, 126, 126, 0.66);
    font-family: -apple-system,BlinkMacSystemFont,sans-serif;
`

export const DebugObserver = () => {
  const snapshot = useRecoilSnapshot()

  useEffect(() => {
    console.groupCollapsed(
      '%cRECOIL ATOMS CHANGED\t\t%c%s',
      groupStyle,
      timestampStyle,
      new Date().toISOString(),
    )

    for (const node of snapshot.getNodes_UNSTABLE()) {
      console.log(node.key, snapshot.getLoadable(node))
    }

    console.groupEnd()
  })

  return null
}
