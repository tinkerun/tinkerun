import {InfoSignIcon, Text, Tooltip} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'

const SSHKeyTooltip = () => (
  <Tooltip
    content={(
      <Text
        size={300}
        color="white"
      >
        <FormattedMessage
          id='connections.ssh_key_tooltip'
        />
      </Text>
    )}
  >
    <InfoSignIcon
      size={12}
      color='muted'
    />
  </Tooltip>
)

export default SSHKeyTooltip
