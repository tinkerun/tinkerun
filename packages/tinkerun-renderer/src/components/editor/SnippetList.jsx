import {Pane} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'

import SnippetItem from './SnippetItem'
import {snippetListAtom} from '../../stores/snippets'

const SnippetList = () => {
  const snippets = useAtomValue(snippetListAtom)

  return (
    <Pane>
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
