import {useEffect, useState} from 'react'
import {Dialog, Paragraph, Strong} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'

import {onDeleteConnectionConfirm, deleteConnection} from '../../utils/api'

const DeleteConfirm = () => {
  const [isShow, setIsShow] = useState(false)
  const [connection, setConnection] = useState({})
  const intl = useIntl()

  const confirm = () => {
    if (connection.id) {
      deleteConnection(connection.id)
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
      confirmLabel={intl.formatMessage({id: 'connections.delete'})}
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

export default DeleteConfirm
