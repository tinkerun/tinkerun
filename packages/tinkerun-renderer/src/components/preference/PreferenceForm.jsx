import {majorScale, Pane} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'

import GeneralForm from './GeneralForm'
import {preferenceTabIndexAtom} from '../../stores/preference'

const PreferenceForm = () => {
  const tabIndex = useAtomValue(preferenceTabIndexAtom)

  return (
    <Pane
      padding={majorScale(2)}
      minHeight='100vh'
      flex={1}
    >
      {tabIndex === 0 && (
        <GeneralForm/>
      )}
    </Pane>
  )
}

export default PreferenceForm
