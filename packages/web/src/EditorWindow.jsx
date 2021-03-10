import {Route} from 'wouter'

import EditorPage from './components/EditorPage'
import WindowContainer from './components/WindowContainer'
import ConnectionProvider from './components/ConnectionProvider'

const EditorWindow = () => (
  <WindowContainer>
    <ConnectionProvider>
      <Route path='/' component={EditorPage}/>
    </ConnectionProvider>
  </WindowContainer>
)

export default EditorWindow
