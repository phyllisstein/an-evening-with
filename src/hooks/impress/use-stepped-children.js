import { Children, cloneElement } from 'react'
import { Step } from 'components/impress'
import { useMem } from '../optimization'

const getSteppedChildren = c => {
    const childArray = Children.toArray(c)

    return childArray.reduce((acc, child, index) => {
        const nextChild = cloneElement(child, {
            step: index + 1,
        })

        acc.push(nextChild)
        return acc
    }, [])
}

const getStepCount = c => {
    const childArray = Children.toArray(c)

    return childArray.length
}

export const useSteppedChildren = children => {
    const memoSteppedChildren = useMem(getSteppedChildren)
    const memoStepCount = useMem(getStepCount)

    const steppedChildren = memoSteppedChildren(children)
    const stepCount = memoStepCount(children)

    return [steppedChildren, stepCount]
}
