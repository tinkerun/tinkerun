import {Pane} from 'evergreen-ui'
import {Route} from 'wouter'

import Editor from './editor/Editor'
import EditorHeader from './editor/EditorHeader'
import Form from './editor/Form'

const EditorPage = () => (
  <Pane
    position='relative'
    display='flex'
    flexDirection='column'
    height='100%'
  >
    <EditorHeader/>
    <Route path='/snippets/:id' component={Editor}/>
    <Route path='/snippets/:id/form' component={Form}/>
  </Pane>
)

export default EditorPage
