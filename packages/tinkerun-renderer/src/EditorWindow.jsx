import {Route} from 'wouter'

import EditorPage from './components/EditorPage'
import WindowContainer from './components/WindowContainer'
import EditorContainer from './components/EditorContainer'

const EditorWindow = () => (
  <WindowContainer>
    <EditorContainer>
      <Route path='/' component={EditorPage}/>
    </EditorContainer>
  </WindowContainer>
)

export default EditorWindow
