import {Pane} from 'evergreen-ui'

import Editor from './editor/Editor'
import Output from './editor/Output'
import Toolbar from './editor/Toolbar'
import EditorContainer from './editor/EditorContainer'

const EditorPage = () => {
  return (
    <Pane
      flex={1}
      height='100vh'
      display='flex'
      flexDirection='column'
    >
      <EditorContainer.Provider>
        <Editor/>
        <Toolbar/>
        <Output/>
      </EditorContainer.Provider>
    </Pane>
  )
}

export default EditorPage
