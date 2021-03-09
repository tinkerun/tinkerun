import {Button, PlusIcon, majorScale} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {useLocation} from 'wouter'

import {createConnection} from '../../utils/api'

const CreateButton = () => {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    const id = createConnection()
    setLocation(`/connections/${id}`)
  }

  return (
    <Button
      iconBefore={PlusIcon}
      height={majorScale(4)}
      width='100%'
      onClick={handleClick}
    >
      <FormattedMessage id='connections.create'/>
    </Button>
  )
}

export default CreateButton
