import {useCallback} from 'react'
import {IconButton, majorScale, PlayIcon} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import {useRoute} from 'wouter'
import debounce from 'lodash/debounce'

import Tooltip from '../Tooltip'
import {snippetAtomWithId} from '../../stores/snippets'
import {runAtom} from '../../stores/editor'

const RunButton = () => {
  const [, params] = useRoute('/snippets/:id/:form?')
  const [matchFormRoute] = useRoute('/snippets/:id/form')
  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const run = useUpdateAtom(runAtom)

  const isDisabled = () => {
    if (snippet) {
      return snippet.code.trim() === ''
    }

    return false
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runDebounced = useCallback(debounce(code => run(code), 500), [])

  const handleClick = () => runDebounced(snippet.code)

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
        display={matchFormRoute ? 'none' : 'flex'}
      />
    </Tooltip>
  )
}

export default RunButton
