import {useEffect, useMemo, useState} from 'react'
import {useRoute} from 'wouter'
import {majorScale, Pane} from 'evergreen-ui'

import ConnectionsContainer from './connections/ConnectionsContainer'
import ConnectionFormProvider from './connections/ConnectionFormProvider'
import ConnectionForm from './connections/ConnectionForm'
import {updateConnection} from '../utils/api'

const ConnectionPage = () => {
  const [match, params] = useRoute('/connections/:id')
  const [connection, setConnection] = useState({})
  const container = ConnectionsContainer.useContainer()

  useEffect(() => {
    if (match && params.id !== connection.id) {
      setConnection(container.getConnection(params.id))
    }
  }, [params])

  const handleSubmit = data => {
    updateConnection(data)
    container.updateConnection(data)
  }

  // prevent update connection loop
  // https://github.com/jamiebuilds/unstated-next#4-wrapping-your-elements-with-usememo
  return useMemo(() => (
    <Pane
      flex={1}
      height='100vh'
      overflowY='scroll'
      padding={majorScale(2)}
    >
      <ConnectionFormProvider defaultValues={connection}>
        <ConnectionForm onSubmit={handleSubmit}/>
      </ConnectionFormProvider>
    </Pane>
  ), [connection])
}

export default ConnectionPage
