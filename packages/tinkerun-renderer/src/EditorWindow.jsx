import {Route} from 'wouter'

import EditorPage from './components/EditorPage'
import WindowContainer from './components/WindowContainer'

const EditorWindow = () => (
  <WindowContainer>
    <Route path='/' component={EditorPage}/>
  </WindowContainer>
)

export default EditorWindow
