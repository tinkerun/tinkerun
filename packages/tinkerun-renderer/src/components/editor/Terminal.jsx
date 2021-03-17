import {useMemo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import xterm from 'xterm'
import 'xterm/css/xterm.css'

import OutputContainer from './OutputContainer'
import {onOutputConnection, inputConnection} from '../../utils/api'
import {getTermOptions} from '../../utils/getTermOptions'
import useFitAddon from '../../hooks/useFitAddon'

const Terminal = () => {
  const domRef = useRef()
  const {fitAddonRef} = useFitAddon()
  const {appendOutputContent, clearOutputContent} = OutputContainer.useContainer()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const term = new xterm.Terminal({
      ...getTermOptions(),
      fontSize: 12,
      cursorBlink: true,
      disableStdin: false,
      convertEol: true,
    })

    term.open(domRef.current)
    // 绑定输入
    term.onData(inputConnection)

    term.attachCustomKeyEventHandler(event => {
      // command + k 清空 terminal
      if (event.metaKey && event.key === 'k') {
        term.clear()
        return false
      }
    })

    term.onKey(({domEvent}) => {
      if (domEvent.key === 'Enter') {
        // 监听每一次执行命令的时候，清空 output content
        clearOutputContent()
      }
    })

    const output = data => {
      appendOutputContent(data)
      term.write(data)
    }

    const onOutput = onOutputConnection(output)

    term.loadAddon(fitAddonRef.current)

    return () => {
      onOutput.dispose()
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

export default Terminal
