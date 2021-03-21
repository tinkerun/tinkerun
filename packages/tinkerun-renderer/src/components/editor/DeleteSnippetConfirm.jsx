import {useEffect, useState} from 'react'
import {Dialog, Paragraph, Strong} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'
import {useLocation, useRoute} from 'wouter'
import {useUpdateAtom} from 'jotai/utils'

import {onDeleteSnippetConfirm} from '../../utils/api'
import {deleteSnippetAtom} from '../../stores/snippets'

const DeleteSnippetConfirm = () => {
  const [isShow, setIsShow] = useState(false)
  const [snippet, setSnippet] = useState({})
  const intl = useIntl()
  const [match, params] = useRoute('/snippets/:id')
  const [, setLocation] = useLocation()
  const deleteSnippet = useUpdateAtom(deleteSnippetAtom)

  const confirm = () => {
    if (snippet.id) {
      deleteSnippet(snippet.id)

      // 如果删除的 connection 和当前页面的 connection 相同则返回首页
      if (match && params.id === snippet.id) {
        setLocation('/')
      }
    }

    hide()
  }

  const hide = () => setIsShow(false)

  useEffect(() => {
    const onConfirm = onDeleteSnippetConfirm(snippet => {
      setIsShow(true)
      setSnippet(snippet)
    })

    return () => onConfirm.dispose()
  }, [])

  return (
    <Dialog
      isShown={isShow}
      title={intl.formatMessage({id: 'editor.delete_confirm_title'})}
      intent="danger"
      onConfirm={confirm}
      onCloseComplete={hide}
      confirmLabel={intl.formatMessage({id: 'editor.delete_snippet'})}
      cancelLabel={intl.formatMessage({id: 'cancel'})}
      width={400}
    >
      <Paragraph
        size={400}
      >
        <FormattedMessage
          id='editor.delete_confirm_content'
          values={{
            name: snippet.name,
            // eslint-disable-next-line react/display-name
            strong: chucks => <Strong>{chucks}</Strong>,
          }}
        />
      </Paragraph>
    </Dialog>
  )
}

export default DeleteSnippetConfirm
