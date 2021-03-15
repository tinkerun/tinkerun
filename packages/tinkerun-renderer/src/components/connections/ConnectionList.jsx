import {Pane} from 'evergreen-ui'

import ConnectionItem from './ConnectionItem'
import DeleteConfirm from './DeleteConfirm'
import ConnectionsContainer from './ConnectionsContainer'

const ConnectionList = () => {
  const {connections} = ConnectionsContainer.useContainer()

  return (
    <Pane>
      <DeleteConfirm/>
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
