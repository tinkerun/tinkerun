import {FormattedMessage} from 'react-intl'
import {Menu, NewLayersIcon, majorScale} from 'evergreen-ui'

const CreateGroupMenuItem = () => {
  const handleSelect = () => {
    // unimplemented
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

export default CreateGroupMenuItem
