import {useMemo} from 'react'
import {useRoute} from 'wouter'
import {majorScale, Pane} from 'evergreen-ui'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import ConnectionFormProvider from './connections/ConnectionFormProvider'
import ConnectionForm from './connections/ConnectionForm'
import {connectionAtomWithId, updateConnectionAtom} from '../stores/connections'

const ConnectionPage = () => {
  const [, params] = useRoute('/connections/:id')
  const connection = useAtomValue(connectionAtomWithId(params.id)) || {}
  const updateConnection = useUpdateAtom(updateConnectionAtom)

  const handleSubmit = data => {
    updateConnection(data)
  }

  return useMemo(() => (
    <Pane
      flex={1}
      height='100%'
      overflowY='auto'
      padding={majorScale(2)}
    >
      <ConnectionFormProvider defaultValues={connection}>
        <ConnectionForm onSubmit={handleSubmit}/>
      </ConnectionFormProvider>
    </Pane>
  ), [connection.id])
}

export default ConnectionPage
