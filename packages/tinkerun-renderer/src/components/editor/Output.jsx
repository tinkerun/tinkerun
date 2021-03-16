import {useMemo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import xterm from 'xterm'
import 'xterm/css/xterm.css'

import OutputContentContainer from './OutputContentContainer'
import {getTermOptions} from '../../utils/getTermOptions'
import useFitAddon from '../../hooks/useFitAddon'

const Output = () => {
  const domRef = useRef()
  const termRef = useRef()
  const {fitAddonRef} = useFitAddon()
  const {getOutputContent} = OutputContentContainer.useContainer()

  const content = getOutputContent()

  // 写入内容至 output
  useEffect(() => {
    const term = termRef.current
    if (term) {
      term.reset()
      term.write(content)
    }
  }, [content])

  // 设置 fit addon
  useEffect(() => {
    const term = termRef.current
    const fitAddon = fitAddonRef.current
    if (term && fitAddon) {
      term.loadAddon(fitAddon)
      fitAddon.fit()
    }
  }, [fitAddonRef])

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
