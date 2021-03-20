import {Route, Switch} from 'wouter'
import {Pane} from 'evergreen-ui'
import {Provider} from 'jotai'

import EditorPage from './components/EditorPage'
import WindowContainer from './components/WindowContainer'
import Sidebar from './components/editor/Sidebar'
import Inspire from './components/Inspire'

const EditorWindow = () => {
  return (
    <WindowContainer>
      <Provider>
        <Pane
          display='flex'
        >
          <Sidebar/>
          <Pane flex={1}>
            <Switch>
              <Route path='/' component={Inspire}/>
              <Route path='/snippets/:id' component={EditorPage}/>
            </Switch>
          </Pane>
        </Pane>
      </Provider>
    </WindowContainer>
  )
}

export default EditorWindow
