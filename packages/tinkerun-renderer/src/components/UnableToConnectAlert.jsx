import {Alert, Button, majorScale} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'

import {closeConnection} from '../utils/api'

const UnableToConnectAlert = (props) => {
  const intl = useIntl()

  const handleClick = () => {
    // unimplemented
    closeConnection()
  }

  return (
    <Alert
      appearance="card"
      intent="danger"
      title={intl.formatMessage({id: 'unable_to_connect'})}
      {...props}
    >
      <Button
        marginTop={majorScale(1)}
        height={majorScale(3)}
        onClick={handleClick}
      >
        <FormattedMessage id='ok'/>
      </Button>
    </Alert>
  )
}

export default UnableToConnectAlert
