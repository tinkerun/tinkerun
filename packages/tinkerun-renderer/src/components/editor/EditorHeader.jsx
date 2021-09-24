import {Pane} from 'evergreen-ui'
import {useRoute} from 'wouter'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import Header from '../Header'
import SnippetNameInput from './SnippetNameInput'
import RunButton from './RunButton'
import FormButton from './FormButton'
import {snippetAtomWithId, updateSnippetAtom} from '../../stores/snippets'
import {configAtom} from '../../stores/config'

const EditorHeader = () => {
  const [, params] = useRoute('/snippets/:id/:form?')

  const config = useAtomValue(configAtom)
  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const updateSnippet = useUpdateAtom(updateSnippetAtom)

  const handleChange = name => {
    updateSnippet({
      id: snippet.id,
      name,
    })
  }

  if (!snippet) {
    return null
  }

  return (
    <Header
      borderBottom
    >
      <SnippetNameInput
        value={snippet.name}
        onChange={handleChange}
      />
      <Pane
        display='flex'
      >
        <RunButton/>
        {config.form_switch && (
          <FormButton/>
        )}
      </Pane>
    </Header>
  )
}

export default EditorHeader
