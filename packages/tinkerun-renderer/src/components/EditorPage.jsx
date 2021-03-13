import {Pane} from 'evergreen-ui'

import ConnectionProvider from './ConnectionProvider'
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
        <Pane
          position='relative'
          borderTop
        >
          <ConnectionProvider>
            <Output/>
          </ConnectionProvider>
        </Pane>
      </EditorContainer.Provider>
    </Pane>
  )
}

export default EditorPage
