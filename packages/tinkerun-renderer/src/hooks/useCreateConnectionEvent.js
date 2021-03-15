import {useEffect} from 'react'

import ConnectionListContainer from '../components/connections/ConnectionListContainer'
import {onCreateConnection} from '../utils/api'

const useCreateConnectionEvent = () => {
  const {createConnection} = ConnectionListContainer.useContainer()
  useEffect(() => {
    const onCreate = onCreateConnection(createConnection)
    return () => onCreate.dispose()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useCreateConnectionEvent
