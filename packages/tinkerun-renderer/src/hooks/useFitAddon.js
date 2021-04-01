import {useEffect, useRef} from 'react'
import {FitAddon} from 'xterm-addon-fit'

import {useAtomValue} from 'jotai/utils'
import {sizesAtom, outputTabIndexAtom} from '../stores/editor'

const useFitAddon = () => {
  const fitAddonRef = useRef()
  const sizes = useAtomValue(sizesAtom)
  const tabIndex = useAtomValue(outputTabIndexAtom)

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
  }, [sizes, tabIndex])

  return {
    fitAddonRef,
  }
}

export default useFitAddon
