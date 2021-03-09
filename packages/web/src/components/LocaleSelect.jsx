import {Select} from 'evergreen-ui'
import {useIntl} from 'react-intl'

import {setLocale, allLocales, getLocale} from '../utils/api'

const LocaleSelect = () => {
  const intl = useIntl()

  const handleChange = e => {
    const locale = e.target.value
    setLocale(locale)
  }

  return (
    <Select
      onChange={handleChange}
      defaultValue={getLocale()}
    >
      {allLocales().map(locale => (
        <option
          key={`locales_${locale}`}
          value={locale}
        >
          {intl.formatMessage({id: locale})}
        </option>
      ))}
    </Select>
  )
}

export default LocaleSelect
