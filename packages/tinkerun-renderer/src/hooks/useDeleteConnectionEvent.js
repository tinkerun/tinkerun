import {useLocation, useRoute} from 'wouter'
import {useEffect} from 'react'

import ConnectionListContainer from '../components/connections/ConnectionListContainer'
import {onDeleteConnection} from '../utils/api'

const useDeleteConnectionEvent = () => {
  const {deleteConnection} = ConnectionListContainer.useContainer()

  const [match, params] = useRoute('/connections/:id')
  const [, setLocation] = useLocation()

  useEffect(() => {
    const cb = id => {
      deleteConnection(id)

      // 如果删除的 connection 和当前页面的 connection 相同则返回首页
      if (match && params.id === id) {
        setLocation('/')
      }
    }

    const onDelete = onDeleteConnection(cb)

    return () => onDelete.dispose()
  }, [params]) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useDeleteConnectionEvent
