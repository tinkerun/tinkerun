import {useIntl} from 'react-intl'

import GeneralField from './GeneralField'

const FormPrefixField = () => {
  const intl = useIntl()
  return (
    <GeneralField
      label={intl.formatMessage({id: 'preference.form_prefix'})}
      description={intl.formatMessage({id: 'preference.form_prefix_description'})}
      configKey='form_prefix'
    />
  )
}

export default FormPrefixField
