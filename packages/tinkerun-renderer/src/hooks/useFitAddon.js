import {useEffect, useRef} from 'react'
import {FitAddon} from 'xterm-addon-fit'

import {useAtomValue} from 'jotai/utils'
import {sizesAtom} from '../stores/editor'

const useFitAddon = () => {
  const fitAddonRef = useRef()
  const sizes = useAtomValue(sizesAtom)

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
  }, [sizes])

  return {
    fitAddonRef,
  }
}

export default useFitAddon
