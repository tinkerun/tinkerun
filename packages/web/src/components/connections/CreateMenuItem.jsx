import {majorScale, Menu, NewLayerIcon} from 'evergreen-ui'
import {useLocation} from 'wouter'
import {FormattedMessage} from 'react-intl'

import {createConnection} from '../../utils/api'

const CreateMenuItem = () => {
  const [, setLocation] = useLocation()

  const handleSelect = () => {
    const id = createConnection()
    setLocation(`/connections/${id}`)
  }

  return (
    <Menu.Item
      icon={NewLayerIcon}
      height={majorScale(4)}
      onSelect={handleSelect}
    >
      <FormattedMessage
        id='connections.create'
      />
    </Menu.Item>
  )
}

export default CreateMenuItem
