import PropTypes from 'prop-types'
import {majorScale, Menu, NewLayerIcon} from 'evergreen-ui'
import {useLocation} from 'wouter'
import {FormattedMessage} from 'react-intl'

import {createConnection} from '../../utils/api'

const CreateMenuItem = ({close}) => {
  const [, setLocation] = useLocation()

  const handleSelect = () => {
    const id = createConnection()
    setLocation(`/connections/${id}`)
    close()
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

CreateMenuItem.propTypes = {
  close: PropTypes.func.isRequired,
}

export default CreateMenuItem
