import {memo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import xterm from 'xterm'
import 'xterm/css/xterm.css'

import {onExecuteConnection} from '../../utils/api'
import {getTermOptions} from '../../utils/getTermOptions'
import useFitAddon from '../../hooks/useFitAddon'

const Output = () => {
  const domRef = useRef()
  const {fitAddonRef} = useFitAddon()

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

    const execute = data => {
      term.clear()
      term.write(data)
    }

    const onExecute = onExecuteConnection(execute)

    term.loadAddon(fitAddonRef.current)
    fitAddonRef.current.fit()

    return () => {
      onExecute.dispose()
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

export default memo(Output)
