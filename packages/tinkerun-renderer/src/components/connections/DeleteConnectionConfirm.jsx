import {useEffect, useState} from 'react'
import {Dialog, Paragraph, Strong} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'
import {useLocation, useRoute} from 'wouter'
import {useUpdateAtom} from 'jotai/utils'

import {onDeleteConnectionConfirm} from '../../utils/api'
import {deleteConnectionAtom} from '../../stores/connections'

const DeleteConnectionConfirm = () => {
  const [isShow, setIsShow] = useState(false)
  const [connection, setConnection] = useState({})
  const intl = useIntl()
  const [match, params] = useRoute('/connections/:id')
  const [, setLocation] = useLocation()
  const deleteConnection = useUpdateAtom(deleteConnectionAtom)

  const confirm = () => {
    if (connection.id) {
      deleteConnection(connection.id)

      // 如果删除的 connection 和当前页面的 connection 相同则返回首页
      if (match && params.id === connection.id) {
        setLocation('/')
      }
    }

    hide()
  }

  const hide = () => setIsShow(false)

  useEffect(() => {
    const onConfirm = onDeleteConnectionConfirm(connection => {
      setIsShow(true)
      setConnection(connection)
    })

    return () => onConfirm.dispose()
  }, [])

  return (
    <Dialog
      isShown={isShow}
      title={intl.formatMessage({id: 'connections.delete_confirm_title'})}
      intent="danger"
      onConfirm={confirm}
      onCloseComplete={hide}
      confirmLabel={intl.formatMessage({id: 'connections.delete_connection'})}
      cancelLabel={intl.formatMessage({id: 'cancel'})}
      width={400}
    >
      <Paragraph
        size={400}
      >
        <FormattedMessage
          id='connections.delete_confirm_content'
          values={{
            name: connection.name,
            // eslint-disable-next-line react/display-name
            strong: chucks => <Strong>{chucks}</Strong>,
          }}
        />
      </Paragraph>
    </Dialog>
  )
}

export default DeleteConnectionConfirm
