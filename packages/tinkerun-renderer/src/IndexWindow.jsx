import {Route, Switch} from 'wouter'
import {Pane} from 'evergreen-ui'
import Split from 'react-split'

import Sidebar from './components/connections/Sidebar'
import Inspire from './components/Inspire'
import ConnectionPage from './components/ConnectionPage'
import WindowContainer from './components/WindowContainer'
import IndexContainer from './components/IndexContainer'
import useSplit from './hooks/useSplit'

const IndexWindow = () => {
  const {splitRef} = useSplit()

  return (
    <WindowContainer>
      <IndexContainer>
        <Pane
          is={Split}
          ref={splitRef}
          display='flex'
          sizes={[36, 64]}
          minSize={[270, 340]}
        >
          <Sidebar/>
          <Switch>
            <Route path='/' component={Inspire}/>
            <Route path='/connections/:id' component={ConnectionPage}/>
          </Switch>
        </Pane>
      </IndexContainer>
    </WindowContainer>
  )
}

export default IndexWindow
