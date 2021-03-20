import Header from '../Header'
import {useRoute} from 'wouter'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import SnippetNameInput from './SnippetNameInput'
import {snippetAtomWithId, updateSnippetAtom} from '../../stores/snippets'

const EditorHeader = () => {
  const [, params] = useRoute('/snippets/:id')

  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const updateSnippet = useUpdateAtom(updateSnippetAtom)

  const handleChange = name => {
    updateSnippet({
      id: snippet.id,
      name,
    })
  }

  return (
    <Header
      marginBottom={1}
      borderBottom
    >
      <SnippetNameInput
        value={snippet.name}
        onChange={handleChange}
      />
    </Header>
  )
}

export default EditorHeader
