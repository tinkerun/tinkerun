import {useEffect, useState} from 'react'
import {Pane} from 'evergreen-ui'

import Loading from './Loading'
import UnableToConnectAlert from './UnableToConnectAlert'
import {onConnectedConnection} from '../utils/api'

const ConnectionProvider = ({children}) => {
  const [isConnected, setIsConnected] = useState(false)
  const [isUnableToConnect, setIsUnableToConnect] = useState(false)

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
            position='absolute'
            left={0}
            right={0}
            top={20}
            marginX='auto'
          />
        )}

        <Loading/>
      </Pane>
    )
  }

  return children
}

export default ConnectionProvider
