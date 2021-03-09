import {Pane} from 'evergreen-ui'
import Split from 'react-split'
import {Route, Switch} from 'wouter'

import Sidebar from './components/connections/Sidebar'
import Inspire from './components/Inspire'
import ConnectionPage from './components/ConnectionPage'
import WindowContainer from './components/WindowContainer'

const IndexWindow = () => (
  <WindowContainer>
    <Pane
      is={Split}
      display='flex'
      sizes={[45, 55]}
      minSize={[240, 300]}
    >
      <Sidebar/>
      <Switch>
        <Route path='/' component={Inspire}/>
        <Route path='/connections/:id' component={ConnectionPage}/>
      </Switch>
    </Pane>
  </WindowContainer>
)

export default IndexWindow