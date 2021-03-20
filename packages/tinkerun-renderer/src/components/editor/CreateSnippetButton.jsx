import {IconButton, PlusIcon} from 'evergreen-ui'
import {nanoid} from 'nanoid'
import {useUpdateAtom} from 'jotai/utils'
import {useIntl} from 'react-intl'

import {createSnippetAtom} from '../../stores/snippets'

const CreateSnippetButton = () => {
  const createSnippet = useUpdateAtom(createSnippetAtom)
  const intl = useIntl()

  const handleClick = () => {
    createSnippet({
      id: nanoid(),
      code: '',
      name: intl.formatMessage({id: 'editor.new_snippet'}),
    })
  }

  return (
    <IconButton
      appearance='minimal'
      onClick={handleClick}
      icon={PlusIcon}
    />
  )
}

export default CreateSnippetButton
