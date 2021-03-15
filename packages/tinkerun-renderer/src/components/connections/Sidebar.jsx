import {majorScale, Pane} from 'evergreen-ui'

import QuickButton from './QuickButton'
import CreateButton from './CreateButton'
import ConnectionList from './ConnectionList'

const Sidebar = () => (
  <Pane
    paddingY={majorScale(2)}
    height='100vh'
    display='flex'
    flexShrink={0}
    flexDirection='column'
    borderRight
  >
    <Pane
      display='flex'
      justifyContent='space-between'
      paddingX={majorScale(2)}
    >
      <QuickButton/>
      <CreateButton/>
    </Pane>

    <Pane
      marginTop={majorScale(2)}
      flex={1}
      overflowY='scroll'
    >
      <ConnectionList/>
    </Pane>
  </Pane>
)

export default Sidebar
