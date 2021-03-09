import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Menu, NewLayersIcon, majorScale} from 'evergreen-ui'

const CreateGroupMenuItem = ({close}) => {
  const handleSelect = () => {
    // unimplemented
    close()
  }

  return (
    <Menu.Item
      icon={NewLayersIcon}
      height={majorScale(4)}
      onSelect={handleSelect}
    >
      <FormattedMessage
        id='connections.create_group'
      />
    </Menu.Item>
  )
}

CreateGroupMenuItem.propTypes = {
  close: PropTypes.func.isRequired,
}

export default CreateGroupMenuItem
