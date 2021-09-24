import {useIntl} from 'react-intl'

import ShortcutField from './ShortcutField'

const ShortcutNewConnectionField = () => {
  const intl = useIntl()

  return (
    <ShortcutField
      label={intl.formatMessage({id: 'preference.shortcut_new_connection'})}
      description={intl.formatMessage({id: 'preference.shortcut_new_connection_description'})}
      configKey='shortcut_new_connection'
    />
  )
}

export default ShortcutNewConnectionField
