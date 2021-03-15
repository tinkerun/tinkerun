import {useEffect} from 'react'

import ConnectionListContainer from '../components/connections/ConnectionListContainer'
import {onUpdateConnection} from '../utils/api'

const useUpdateConnectionEvent = () => {
  const {updateConnection} = ConnectionListContainer.useContainer()

  useEffect(() => {
    const onUpdate = onUpdateConnection(updateConnection)
    return () => onUpdate.dispose()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useUpdateConnectionEvent
