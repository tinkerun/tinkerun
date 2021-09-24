import {useEffect} from 'react'
import {Pane} from 'evergreen-ui'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import {nanoid} from 'nanoid'
import {useLocation} from 'wouter'

import ConnectionItem from './ConnectionItem'
import DeleteConnectionConfirm from './DeleteConnectionConfirm'
import {connectionListAtom, createConnectionAtom} from '../../stores/connections'
import {onCloneConnection} from '../../utils/api'

const ConnectionList = () => {
  const [, setLocation] = useLocation()
  const connections = useAtomValue(connectionListAtom)
  const createConnection = useUpdateAtom(createConnectionAtom)

  useEffect(() => {
    const onClone = onCloneConnection(connection => {
      const connectionNew = {
        ...connection,
        id: nanoid(),
      }

      createConnection(connectionNew)
      setLocation(`/connections/${connectionNew.id}`)
    })

    return () => onClone.dispose()
  }, [])

  return (
    <Pane>
      <DeleteConnectionConfirm/>
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
