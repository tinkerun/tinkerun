import {useIntl} from 'react-intl'

import GeneralField from './GeneralField'

const CommandDefaultField = () => {
  const intl = useIntl()

  return (
    <GeneralField
      label={intl.formatMessage({id: 'preference.command_default'})}
      description={intl.formatMessage({id: 'preference.command_default_description'})}
      configKey='command_default'
    />
  )
}

export default CommandDefaultField
