import { useCallback, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'

export const useStep = max => {
  const navigate = useNavigate()
  const params = useParams()
  const step = Number.parseInt(params.step, 10)
  const maxRef = useRef(null)
  maxRef.current ??= max

  useEffect(() => {
    if (params.step == null) {
      navigate('1')
    } else if (step > maxRef.current) {
      navigate('../1')
    } else if (step < 1) {
      navigate(`../${ maxRef.current }`)
    }
  }, [params.step, step, maxRef])

  const nextPath = `../${ step + 1 }`
  const previousPath = `../${ step - 1 }`

  const next = useCallback(() => navigate(nextPath), [nextPath])
  const previous = useCallback(() => navigate(previousPath), [previousPath])

  return [step, previous, next]
}
