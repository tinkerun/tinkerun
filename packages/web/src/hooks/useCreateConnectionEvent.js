import {useEffect} from 'react'

import ConnectionListContainer from '../components/connections/ConnectionListContainer'
import {offCreateConnection, onCreateConnection} from '../utils/api'

const useCreateConnectionEvent = () => {
  const {createConnection} = ConnectionListContainer.useContainer()
  useEffect(() => {
    onCreateConnection(createConnection)
    return offCreateConnection
  }, [])
}

export default useCreateConnectionEvent
