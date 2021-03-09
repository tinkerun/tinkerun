import {Button, PlusIcon, majorScale, IconButton} from 'evergreen-ui'
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
    <IconButton
      icon={PlusIcon}
      height={majorScale(3)}
      onClick={handleClick}
      appearance='minimal'
    >
      <FormattedMessage id='connections.create'/>
    </IconButton>
  )
}

export default CreateButton
