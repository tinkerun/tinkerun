import {majorScale, Select, SelectField} from 'evergreen-ui'
import {useIntl} from 'react-intl'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import {allLocales} from '../../utils/api'
import {configAtom, setConfigAtom} from '../../stores/config'

const LocaleSelectField = () => {
  const intl = useIntl()
  const config = useAtomValue(configAtom)
  const setConfig = useUpdateAtom(setConfigAtom)

  const handleChange = e => {
    setConfig({
      locale: e.target.value,
    })
  }

  return (
    <SelectField
      label='Locale'
      onChange={handleChange}
      defaultValue={config.locale}
      inputHeight={majorScale(3)}
    >
      {allLocales().map(locale => (
        <option
          key={`locales_${locale}`}
          value={locale}
        >
          {intl.formatMessage({id: locale})}
        </option>
      ))}
    </SelectField>
  )
}

export default LocaleSelectField
