import {InfoSignIcon, Text, Tooltip} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'

const DefaultCommandTooltip = () => (
  <Tooltip
    content={(
      <Text
        size={300}
        color="white"
      >
        <FormattedMessage id='preference.default_command_tooltip'/>
      </Text>
    )}
  >
    <InfoSignIcon
      size={12}
      color='muted'
    />
  </Tooltip>
)

export default DefaultCommandTooltip
