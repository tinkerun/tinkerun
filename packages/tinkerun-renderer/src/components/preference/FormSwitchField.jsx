import {FormField, majorScale, Switch} from 'evergreen-ui'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import {useIntl} from 'react-intl'

import {configAtom, setConfigAtom} from '../../stores/config'

const FormSwitchField = () => {
  const intl = useIntl()
  const config = useAtomValue(configAtom)
  const setConfig = useUpdateAtom(setConfigAtom)

  const handleChange = e => {
    setConfig({
      form_switch: e.target.checked,
    })
  }

  return (
    <FormField
      label={intl.formatMessage({id: 'preference.form_switch'})}
      description={intl.formatMessage({id: 'preference.form_switch_description'})}
      marginBottom={majorScale(3)}
    >
      <Switch
        checked={config.form_switch}
        onChange={handleChange}
      />
    </FormField>
  )
}

export default FormSwitchField
