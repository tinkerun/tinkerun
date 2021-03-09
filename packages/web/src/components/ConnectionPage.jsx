import {useRoute} from 'wouter'
import {majorScale, Pane} from 'evergreen-ui'

import ConnectionForm from './connections/ConnectionForm'
import {getConnection} from '../utils/api'

const ConnectionPage = () => {
  const [match, params] = useRoute('/connections/:id')

  const connection = match ? getConnection(params.id) : {}

  return (
    <Pane
      flex={1}
      height='100vh'
      overflowY='scroll'
      padding={majorScale(2)}
    >
      <ConnectionForm
        defaultValues={connection}
      />
    </Pane>
  )
}

export default ConnectionPage
