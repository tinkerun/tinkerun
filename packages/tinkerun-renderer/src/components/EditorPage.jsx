import {Pane} from 'evergreen-ui'
import {Switch, Route} from 'wouter'

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
    <Route path='/snippets/:id/:mode' component={EditorHeader}/>
    <Switch>
      <Route path='/snippets/:id/editor' component={Editor}/>
      <Route path='/snippets/:id/form' component={Form}/>
    </Switch>
  </Pane>
)

export default EditorPage
