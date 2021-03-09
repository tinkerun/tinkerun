import {useEffect} from 'react'

import ConnectionListContainer from '../components/connections/ConnectionListContainer'
import {offUpdateConnection, onUpdateConnection} from '../utils/api'

const useUpdateConnectionEvent = () => {
  const {updateConnection} = ConnectionListContainer.useContainer()

  useEffect(() => {
    onUpdateConnection(updateConnection)
    return offUpdateConnection
  }, [])
}

export default useUpdateConnectionEvent
