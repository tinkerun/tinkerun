import {majorScale, Pane} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'

import GeneralForm from './GeneralForm'
import ShortcutsForm from './ShortcutsForm'
import LabForm from './LabForm'
import {preferenceTabIndexAtom} from '../../stores/preference'

const PreferenceForm = () => {
  const tabIndex = useAtomValue(preferenceTabIndexAtom)

  return (
    <Pane
      padding={majorScale(2)}
      height='100vh'
      flex={1}
      overflowY='auto'
    >
      {tabIndex === 0 && (
        <GeneralForm/>
      )}

      {tabIndex === 1 && (
        <ShortcutsForm/>
      )}

      {tabIndex === 2 && (
        <LabForm/>
      )}
    </Pane>
  )
}

export default PreferenceForm
