import { Children, cloneElement } from 'react'
import { Step } from 'app/components/impress'
import { useMem } from '../optimization'

export const useSteppedChildren = children => {
    const getSteppedChildren = useMem(c => {
        const childArray = Children.toArray(c)

        let stepCount = 0

        return childArray.reduce((acc, child, index) => {
            if (child.type === Step) {
                stepCount += 1

                const nextChild = cloneElement(child, {
                    step: stepCount,
                })
                acc.push(nextChild)
            } else {
                acc.push(child)
            }

            return acc
        }, [])
    })

    const getStepCount = useMem(c => {
        const childArray = Children.toArray(children)

        return childArray.filter(child => child.type === Step).length
    })

    const steppedChildren = getSteppedChildren(children)
    const stepCount = getStepCount(children)

    return [steppedChildren, stepCount]
}