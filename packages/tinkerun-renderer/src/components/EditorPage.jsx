import {Pane} from 'evergreen-ui'

import Editor from './editor/Editor'
import EditorHeader from './editor/EditorHeader'

const EditorPage = () => (
  <Pane
    position='relative'
    display='flex'
    flexDirection='column'
    height='100%'
  >
    <EditorHeader/>
    <Editor/>
  </Pane>
)

export default EditorPage
