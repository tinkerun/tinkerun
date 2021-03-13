import {memo, useEffect, useRef} from 'react'
import {majorScale, Pane} from 'evergreen-ui'
import xterm from 'xterm'
import 'xterm/css/xterm.css'

import {offOutputConnection, onOutputConnection, inputConnection} from '../../utils/api'
import {getTermOptions} from '../../utils/getTermOptions'

const Terminal = () => {
  const termRef = useRef()
  let term = null

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    term = new xterm.Terminal({
      ...getTermOptions(),
      fontSize: 12,
      cursorStyle: 'bar',
      cursorBlink: true,
      disableStdin: false,
      convertEol: true,
    })

    term.open(termRef.current)
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

    return () => {
      offOutputConnection(output)
      term.dispose()
    }
  }, [])

  return (
    <Pane
      ref={termRef}
      height={400}
      overflowY='scroll'
      padding={majorScale(1)}
    />
  )
}

export default memo(Terminal)
