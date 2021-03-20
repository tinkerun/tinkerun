import PropTypes from 'prop-types'
import {Popover, Menu, MoreIcon, Position, IconButton, TrashIcon, EditIcon} from 'evergreen-ui'

const SnippetControl = ({onRename, onDelete}) => {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Item
            secondaryText="⌘R"
            icon={EditIcon}
          >
            Rename
          </Menu.Item>
          <Menu.Item
            intent='danger'
            icon={TrashIcon}
          >
            Delete...
          </Menu.Item>
        </Menu>
      }
    >
      <IconButton
        icon={MoreIcon}
        appearance='minimal'
      />
    </Popover>
  )
}

SnippetControl.propTypes = {
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default SnippetControl
