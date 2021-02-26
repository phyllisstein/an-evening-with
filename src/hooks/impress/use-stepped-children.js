import { Children, cloneElement } from 'react'
import { Step } from 'components/impress'
import { useMem } from '../optimization'

const getSteppedChildren = c => {
  const childArray = Children.toArray(c)

  let childCount = 0

  return childArray.reduce((acc, child) => {
    if (child.type === Step) {
      childCount += 1

      const nextChild = cloneElement(child, {
        step: childCount,
      })

      acc.push(nextChild)
    }

    return acc
  }, [])
}

const getStepCount = c => {
  const childArray = Children.toArray(c)

  return childArray.filter(child => child.type === Step).length
}

export const useSteppedChildren = children => {
  const memoSteppedChildren = useMem(getSteppedChildren)
  const memoStepCount = useMem(getStepCount)

  const steppedChildren = memoSteppedChildren(children)
  const stepCount = memoStepCount(children)

  return [steppedChildren, stepCount]
}
