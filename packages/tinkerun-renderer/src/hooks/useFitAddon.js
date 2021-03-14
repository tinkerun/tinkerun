import {useEffect, useRef} from 'react'
import {FitAddon} from 'xterm-addon-fit'

const useFitAddon = () => {
  const fitAddonRef = useRef()

  useEffect(() => {
    const fitAddon = new FitAddon()

    const fitTerminal = () => {
      try {
        fitAddon.fit()
      } catch (e) {}
    }
    window.addEventListener('resize', fitTerminal)

    fitAddonRef.current = fitAddon

    return () => window.removeEventListener('resize', fitTerminal)
  }, [])

  return {
    fitAddonRef,
  }
}

export default useFitAddon
