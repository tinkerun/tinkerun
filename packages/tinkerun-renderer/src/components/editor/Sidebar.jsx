import {Pane} from 'evergreen-ui'

import ConnectionInfo from './ConnectionInfo'
import CreateSnippetButton from './CreateSnippetButton'
import SnippetList from './SnippetList'
import Header from '../Header'

const Sidebar = () => {
  return (
    <Pane
      width={300}
      height='100vh'
      display='flex'
      flexShrink={0}
      flexDirection='column'
      borderRight
    >
      <Header>
        <ConnectionInfo/>
        <CreateSnippetButton/>
      </Header>

      <Pane
        flex={1}
        overflowY='scroll'
      >
        <SnippetList/>
      </Pane>
    </Pane>
  )
}

export default Sidebar
