import {useEffect} from 'react'
import {Pane} from 'evergreen-ui'

import ConnectionItem from './ConnectionItem'
import ConnectionListContainer from './ConnectionListContainer'
import {
  offUpdateConnection,
  offDeleteConnection,
  onDeleteConnection,
  onUpdateConnection,
  onCreateConnection,
  offCreateConnection,
} from '../../utils/api'

const ConnectionList = () => {
  const {connections, updateConnection, deleteConnection, createConnection} = ConnectionListContainer.useContainer()

  useEffect(() => {
    onUpdateConnection(updateConnection)
    onDeleteConnection(deleteConnection)
    onCreateConnection(createConnection)

    return () => {
      offUpdateConnection()
      offDeleteConnection()
      offCreateConnection()
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
