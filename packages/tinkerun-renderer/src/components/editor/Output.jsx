import {memo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import xterm from 'xterm'
import 'xterm/css/xterm.css'

import {offExecuteConnection, onExecuteConnection} from '../../utils/api'
import {getTermOptions} from '../../utils/getTermOptions'
import useFitAddon from '../../hooks/useFitAddon'

const Output = () => {
  const termRef = useRef()
  const {fitAddonRef} = useFitAddon()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const term = new xterm.Terminal({
      ...getTermOptions(),
      fontSize: 12,
      disableStdin: true,
    })

    term.open(termRef.current)

    const execute = data => {
      term.clear()
      term.write(data)
    }

    onExecuteConnection(execute)

    term.loadAddon(fitAddonRef.current)
    fitAddonRef.current.fit()

    return () => {
      offExecuteConnection(execute)
      term.dispose()
    }
  }, [])

  return (
    <Pane
      height='inherit'
      ref={termRef}
    />
  )
}

export default memo(Output)
