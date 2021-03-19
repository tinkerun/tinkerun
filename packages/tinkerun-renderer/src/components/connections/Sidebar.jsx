import {Pane} from 'evergreen-ui'

import QuickButton from './QuickButton'
import CreateButton from './CreateButton'
import ConnectionList from './ConnectionList'
import Header from '../Header'

const Sidebar = () => (
  <Pane
    height='100vh'
    display='flex'
    flexShrink={0}
    flexDirection='column'
    borderRight
  >
    <Header>
      <QuickButton/>
      <CreateButton/>
    </Header>

    <Pane
      flex={1}
      overflowY='scroll'
    >
      <ConnectionList/>
    </Pane>
  </Pane>
)

export default Sidebar
