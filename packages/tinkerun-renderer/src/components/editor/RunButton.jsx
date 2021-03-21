import {IconButton, majorScale, PlayIcon} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import {useRoute} from 'wouter'

import Tooltip from '../Tooltip'
import {snippetAtomWithId} from '../../stores/snippets'
import {runAtom, tabIndexAtom} from '../../stores/editor'

const RunButton = () => {
  const [, params] = useRoute('/snippets/:id')
  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const run = useUpdateAtom(runAtom)
  const setTabIndex = useUpdateAtom(tabIndexAtom)

  const {code} = snippet
  const disabled = code.trim() === ''

  const handleClick = () => {
    setTabIndex(1)
    run(code)
  }

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
        disabled={disabled}
        borderRadius='50%'
      />
    </Tooltip>
  )
}

export default RunButton
