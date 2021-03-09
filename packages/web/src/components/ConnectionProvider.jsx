import {useEffect, useState} from 'react'

import Loading from './Loading'
import {offConnectedConnection, onConnectedConnection} from '../utils/api'

const ConnectionProvider = ({children}) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    onConnectedConnection(() => {
      setIsConnected(true)
    })

    return () => {
      offConnectedConnection()
    }
  }, [])

  if (!isConnected) {
    return <Loading/>
  }

  return children
}

export default ConnectionProvider
