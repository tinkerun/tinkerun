import {Pane} from 'evergreen-ui'
import Split from 'react-split'

import Editor from './editor/Editor'
import Toolbar from './editor/Toolbar'
import OutputView from './editor/OutputView'
import EditorContainer from './editor/EditorContainer'
import OutputContainer from './editor/OutputContainer'
import useSplit from '../hooks/useSplit'

const EditorPage = () => {
  const {splitRef} = useSplit()

  return (
    <EditorContainer.Provider>
      <OutputContainer.Provider>
        <Pane
          is={Split}
          ref={splitRef}
          sizes={[50, 50]}
          minSize={350}
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
