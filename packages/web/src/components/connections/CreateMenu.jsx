import {
  Popover,
  Menu,
  PlusIcon,
  TextDropdownButton,
  Icon,
  majorScale,
  Position,
} from 'evergreen-ui'

import CreateMenuItem from './CreateMenuItem'
import CreateGroupMenuItem from './CreateGroupMenuItem'

const CreateMenu = () => (
  <Popover
    position={Position.BOTTOM_LEFT}
    content={({close}) =>
      <Menu>
        <CreateMenuItem close={close}/>
        <CreateGroupMenuItem close={close}/>
      </Menu>
    }
  >
    <TextDropdownButton
      height={majorScale(3)}
    >
      <Icon
        icon={PlusIcon}
        size={14}
      />
    </TextDropdownButton>
  </Popover>
)

export default CreateMenu
