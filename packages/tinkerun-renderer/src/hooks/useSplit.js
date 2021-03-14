import {useEffect, useRef} from 'react'

const useSplit = () => {
  const splitRef = useRef()

  useEffect(() => {
    const resize = () => {
      const split = splitRef.current.split
      // https://github.com/nathancahill/split/issues/87#issuecomment-311248421
      split.setSizes(split.getSizes())
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return {
    splitRef,
  }
}

export default useSplit
