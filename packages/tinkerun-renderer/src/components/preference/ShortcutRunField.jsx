import {useIntl} from 'react-intl'

import ShortcutField from './ShortcutField'

const ShortcutRunField = () => {
  const intl = useIntl()

  return (
    <ShortcutField
      label={intl.formatMessage({id: 'preference.shortcut_run'})}
      description={intl.formatMessage({id: 'preference.shortcut_run_description'})}
      configKey='shortcut_run'
    />
  )
}

export default ShortcutRunField
