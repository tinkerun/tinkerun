import {memo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import xterm from 'xterm'
import 'xterm/css/xterm.css'

import {offOutputConnection, onOutputConnection, inputConnection} from '../../utils/api'
import {getTermOptions} from '../../utils/getTermOptions'
import useFitAddon from '../../hooks/useFitAddon'

const Terminal = () => {
  const domRef = useRef()
  const {fitAddonRef} = useFitAddon()

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

    const output = data => {
      term.write(data)
    }

    onOutputConnection(output)

    term.loadAddon(fitAddonRef.current)

    return () => {
      offOutputConnection(output)
      term.dispose()
    }
  }, [])

  return (
    <Pane
      height='inherit'
      ref={domRef}
    />
  )
}

export default memo(Terminal)
