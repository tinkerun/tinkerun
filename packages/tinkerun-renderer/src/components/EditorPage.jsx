import {Pane} from 'evergreen-ui'
import Split from 'react-split'

import Editor from './editor/Editor'
import Toolbar from './editor/Toolbar'
import OutputView from './editor/OutputView'
import EditorContainer from './editor/EditorContainer'
import OutputContainer from './editor/OutputContainer'

const EditorPage = () => {
  return (
    <EditorContainer.Provider>
      <OutputContainer.Provider>
        <Pane
          is={Split}
          sizes={[50, 50]}
          direction='vertical'
          height='100vh'
          display='flex'
          flexDirection='column'
        >
          <Pane
            display='flex'
            flexDirection='column'
          >
            <Editor/>
            <Toolbar/>
          </Pane>
          <OutputView/>
        </Pane>
      </OutputContainer.Provider>
    </EditorContainer.Provider>
  )
}

export default EditorPage
