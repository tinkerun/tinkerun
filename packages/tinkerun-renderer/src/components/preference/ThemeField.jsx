import {majorScale, SelectField} from 'evergreen-ui'
import {useIntl} from 'react-intl'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import {configAtom, setConfigAtom} from '../../stores/config'

const ThemeField = () => {
  const intl = useIntl()
  const config = useAtomValue(configAtom)
  const setConfig = useUpdateAtom(setConfigAtom)

  const handleChange = e => {
    setConfig({
      theme: e.target.value,
    })
  }

  return (
    <SelectField
      label={intl.formatMessage({id: 'preference.theme'})}
      onChange={handleChange}
      defaultValue={config.theme}
      inputHeight={majorScale(3)}
    >
      <option value='default'>Default</option>
      <option value='classic'>Classic</option>
    </SelectField>
  )
}

export default ThemeField
