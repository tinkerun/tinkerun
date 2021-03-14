import {useEffect, useState} from 'react'

import OutputTabContainer from './OutputTabContainer'
import Loading from '../Loading'
import {onConnectedConnection} from '../../utils/api'
import {Pane} from 'evergreen-ui'
import UnableToConnectAlert from './UnableToConnectAlert'

const OutputConnectionProvider = ({children}) => {
  const {setTerminalMode} = OutputTabContainer.useContainer()
  const [isConnected, setIsConnected] = useState(false)
  const [isUnableToConnect, setIsUnableToConnect] = useState(false)

  const handleOK = () => {
    setTerminalMode()
    setIsConnected(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      // 15 秒之后，没有连接上，则提示无法连接
      setIsUnableToConnect(true)
    }, 15000)

    onConnectedConnection(() => {
      setIsConnected(true)
      clearTimeout(timer)
    })

    return () => {
      timer && clearTimeout(timer)
    }
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
