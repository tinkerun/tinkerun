import {Button, majorScale} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {useFormContext} from 'react-hook-form'

import {connectConnection} from '../../utils/api'

const ConnectButton = (props) => {
  const {handleSubmit} = useFormContext()

  const onSubmit = data => {
    connectConnection(data)
  }

  return (
    <Button
      height={majorScale(3)}
      onClick={handleSubmit(onSubmit)}
      {...props}
    >
      <FormattedMessage
        id='connections.connect'
      />
    </Button>
  )
}

export default ConnectButton
