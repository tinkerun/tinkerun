import {majorScale, Pane} from 'evergreen-ui'

import QuickButton from './QuickButton'
import CreateMenu from './CreateMenu'
import ConnectionList from './ConnectionList'
import ConnectionListContainer from './ConnectionListContainer'
import {allConnections} from '../../utils/api'

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
      <CreateMenu/>
    </Pane>

    <Pane
      marginTop={majorScale(2)}
      flex={1}
      overflowY='scroll'
    >
      <ConnectionListContainer.Provider initialState={allConnections()}>
        <ConnectionList/>
      </ConnectionListContainer.Provider>
    </Pane>
  </Pane>
)

export default Sidebar
