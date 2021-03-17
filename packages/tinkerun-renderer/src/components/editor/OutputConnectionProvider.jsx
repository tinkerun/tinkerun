import {useEffect, useRef, useState} from 'react'
import {Pane} from 'evergreen-ui'

import OutputTabContainer from './OutputTabContainer'
import OutputContainer from './OutputContainer'
import UnableToConnectAlert from './UnableToConnectAlert'
import Loading from '../Loading'

const OutputConnectionProvider = ({children}) => {
  const {setTerminalMode} = OutputTabContainer.useContainer()
  const {isConnected, setIsConnected} = OutputContainer.useContainer()
  const [isUnableToConnect, setIsUnableToConnect] = useState(false)
  const timerRef = useRef()

  const handleOK = () => {
    setTerminalMode()
    setIsConnected(true)
  }

  const clearTimer = () => {
    const timer = timerRef.current
    if (timer) {
      clearTimeout(timer)
    }
  }

  useEffect(clearTimer, [isConnected])

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      // 15 秒之后，没有连接上，则提示无法连接
      setIsUnableToConnect(true)
    }, 15000)

    return clearTimer
  }, [])

  if (!isConnected) {
    return (
      <Pane>
        {isUnableToConnect && (
          <UnableToConnectAlert
            width={600}
            position='relative'
            left={0}
            right={0}
            top={20}
            marginX='auto'
            onOK={handleOK}
          />
        )}
        <Loading/>
      </Pane>
    )
  }

  return children
}

export default OutputConnectionProvider
