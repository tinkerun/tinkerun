import {useEffect, useRef} from 'react'
import {FitAddon} from 'xterm-addon-fit'

import SizesContainer from '../components/editor/SizesContainer'

const useFitAddon = () => {
  const fitAddonRef = useRef()
  const {sizes} = SizesContainer.useContainer()

  useEffect(() => {
    const fitAddon = new FitAddon()

    const fitTerminal = () => fitAddon.fit()
    window.addEventListener('resize', fitTerminal)

    fitAddonRef.current = fitAddon

    return () => window.removeEventListener('resize', fitTerminal)
  }, [])

  useEffect(() => {
    if (fitAddonRef.current) {
      fitAddonRef.current.fit()
    }
  }, [sizes, fitAddonRef])

  return {
    fitAddonRef,
  }
}

export default useFitAddon
