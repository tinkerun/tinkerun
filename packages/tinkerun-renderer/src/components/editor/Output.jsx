import {useMemo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'
import xterm from 'xterm'
import 'xterm/css/xterm.css'
import debounce from 'lodash/debounce'

import {getTermOptions} from '../../utils/getTermOptions'
import {outputFilteredAtom} from '../../stores/editor'
import useFitAddon from '../../hooks/useFitAddon'

const Output = () => {
  const domRef = useRef()
  const termRef = useRef()
  const {fitAddonRef} = useFitAddon()
  const content = useAtomValue(outputFilteredAtom)

  // 写入内容至 output
  useEffect(debounce(() => {
    const term = termRef.current
    if (term) {
      term.reset()
      term.write(content)
    }
  }, 400), [content])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const term = new xterm.Terminal({
      ...getTermOptions(),
      fontSize: 12,
      disableStdin: true,
    })

    // 不显示 cursor
    term.setOption('theme', {
      ...term.getOption('theme'),
      cursor: '#fff',
    })

    term.open(domRef.current)
    term.loadAddon(fitAddonRef.current)
    fitAddonRef.current.fit()

    termRef.current = term

    return () => {
      term.dispose()
    }
  }, [])

  return useMemo(() => (
    <Pane
      height='inherit'
      ref={domRef}
    />
  ), [])
}

export default Output
