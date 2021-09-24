import {useAtomValue} from 'jotai/utils'

import FormSwitchField from './FormSwitchField'
import FormPrefixField from './FormPrefixField'
import {configAtom} from '../../stores/config'

const LabForm = () => {
  const config = useAtomValue(configAtom)

  return (
    <>
      <FormSwitchField/>
      {config.form_switch && (
        <FormPrefixField/>
      )}
    </>
  )
}

export default LabForm
