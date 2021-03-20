import {Button, majorScale, PlayIcon} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import {useRoute} from 'wouter'

import {snippetAtomWithId} from '../../stores/snippets'
import {runAtom} from '../../stores/editor'

const RunButton = () => {
  const [, params] = useRoute('/snippets/:id')
  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const run = useUpdateAtom(runAtom)

  const {code} = snippet
  const disabled = code.trim() === ''

  const handleClick = () => run(code)

  return (
    <Button
      height={majorScale(3)}
      iconBefore={PlayIcon}
      onClick={handleClick}
      disabled={disabled}
    >
      <FormattedMessage id='editor.run'/>
    </Button>
  )
}

export default RunButton
