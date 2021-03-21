import {IconButton, PlusIcon} from 'evergreen-ui'
import {nanoid} from 'nanoid'
import {useUpdateAtom} from 'jotai/utils'
import {FormattedMessage, useIntl} from 'react-intl'
import {useLocation} from 'wouter'

import Tooltip from '../Tooltip'
import {createSnippetAtom} from '../../stores/snippets'

const CreateSnippetButton = () => {
  const createSnippet = useUpdateAtom(createSnippetAtom)
  const intl = useIntl()
  const [, setLocation] = useLocation()

  const handleClick = () => {
    const snippet = {
      id: nanoid(),
      code: '',
      name: intl.formatMessage({id: 'editor.new_snippet'}),
    }

    createSnippet(snippet)

    setLocation(`/snippets/${snippet.id}`)
  }

  return (
    <Tooltip
      content={(
        <FormattedMessage id='editor.new_snippet'/>
      )}
    >
      <IconButton
        appearance='minimal'
        onClick={handleClick}
        icon={PlusIcon}
      />
    </Tooltip>
  )
}

export default CreateSnippetButton
