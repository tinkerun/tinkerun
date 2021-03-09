import {useEffect} from 'react'
import {Pane} from 'evergreen-ui'

import ConnectionItem from './ConnectionItem'
import ConnectionListContainer from './ConnectionListContainer'
import {offUpdateConnection, offDeleteConnection, onDeleteConnection, onUpdateConnection} from '../../utils/api'

const ConnectionList = () => {
  const {connections, updateConnection, deleteConnection} = ConnectionListContainer.useContainer()

  useEffect(() => {
    onUpdateConnection(updateConnection)
    onDeleteConnection(deleteConnection)

    return () => {
      offUpdateConnection()
      offDeleteConnection()
    }
  }, [])

  return (
    <Pane>
      {connections.map(connection => (
        <ConnectionItem
          key={connection.id}
          connection={connection}
        />
      ))}
    </Pane>
  )
}

export default ConnectionList
