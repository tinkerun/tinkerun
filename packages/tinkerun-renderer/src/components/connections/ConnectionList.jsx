import {Pane} from 'evergreen-ui'

import ConnectionItem from './ConnectionItem'
import ConnectionListContainer from './ConnectionListContainer'
import useDeleteConnectionEvent from '../../hooks/useDeleteConnectionEvent'
import useCreateConnectionEvent from '../../hooks/useCreateConnectionEvent'
import useUpdateConnectionEvent from '../../hooks/useUpdateConnectionEvent'

const ConnectionList = () => {
  const {connections} = ConnectionListContainer.useContainer()

  useDeleteConnectionEvent()
  useCreateConnectionEvent()
  useUpdateConnectionEvent()

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
