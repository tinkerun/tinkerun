import {memo, useEffect, useRef} from 'react'
import {majorScale, Pane} from 'evergreen-ui'
import xterm from 'xterm'
import 'xterm/css/xterm.css'

import {offExecuteConnection, onExecuteConnection} from '../../utils/api'
import {getTermOptions} from '../../utils/getTermOptions'

const Output = () => {
  const termRef = useRef()
  let term = null

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    term = new xterm.Terminal({
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

    return () => {
      offExecuteConnection(execute)
      term.dispose()
    }
  }, [])

  return (
    <Pane
      padding={majorScale(1)}
    >
      <Pane
        ref={termRef}
        height={400}
        overflowY='scroll'
      />
    </Pane>
  )
}

export default memo(Output)
