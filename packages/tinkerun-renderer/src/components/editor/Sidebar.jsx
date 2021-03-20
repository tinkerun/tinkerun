import {Heading, Pane} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'

import CreateSnippetButton from './CreateSnippetButton'
import SnippetList from './SnippetList'
import Header from '../Header'

const Sidebar = () => {
  return (
    <Pane
      width={240}
      height='100vh'
      display='flex'
      flexShrink={0}
      flexDirection='column'
      borderRight
    >
      <Header>
        <Heading size={400}>
          <FormattedMessage id='editor.snippets'/>
        </Heading>
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
