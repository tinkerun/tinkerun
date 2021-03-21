import {Pane} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'

import SnippetItem from './SnippetItem'
import DeleteSnippetConfirm from './DeleteSnippetConfirm'
import {snippetListAtom} from '../../stores/snippets'

const SnippetList = () => {
  const snippets = useAtomValue(snippetListAtom)

  return (
    <Pane>
      <DeleteSnippetConfirm/>
      {snippets.map(snippet => {
        return (
          <SnippetItem
            key={snippet.id}
            snippet={snippet}
          />
        )
      })}
    </Pane>
  )
}

export default SnippetList
