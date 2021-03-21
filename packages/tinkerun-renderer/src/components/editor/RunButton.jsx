import {IconButton, majorScale, PlayIcon} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import {useRoute} from 'wouter'

import Tooltip from '../Tooltip'
import {snippetAtomWithId} from '../../stores/snippets'
import {runAtom} from '../../stores/editor'

const RunButton = () => {
  const [, params] = useRoute('/snippets/:id')
  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const run = useUpdateAtom(runAtom)

  const isDisabled = () => {
    if (snippet) {
      return snippet.code.trim() === ''
    }

    return false
  }

  const handleClick = () => run(snippet.code)

  return (
    <Tooltip
      content={(
        <FormattedMessage id='editor.run'/>
      )}
    >
      <IconButton
        height={majorScale(4)}
        icon={PlayIcon}
        onClick={handleClick}
        disabled={isDisabled()}
        borderRadius='50%'
      />
    </Tooltip>
  )
}

export default RunButton
