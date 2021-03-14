import PropTypes from 'prop-types'
import {Alert, Button, majorScale} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'

const UnableToConnectAlert = ({onOK, ...props}) => {
  const intl = useIntl()

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
        onClick={onOK}
      >
        <FormattedMessage id='ok'/>
      </Button>
    </Alert>
  )
}

UnableToConnectAlert.propTypes = {
  onOK: PropTypes.func,
}

UnableToConnectAlert.defaultProps = {
  onOK: () => false,
}

export default UnableToConnectAlert
