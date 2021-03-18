import {Pane} from 'evergreen-ui'
import Split from 'react-split'
import debounce from 'lodash/debounce'

import Editor from './editor/Editor'
import Toolbar from './editor/Toolbar'
import OutputTabView from './editor/OutputTabView'
import SizesContainer from './editor/SizesContainer'
import OutputContainer from './editor/OutputContainer'
import useSplit from '../hooks/useSplit'

const EditorPage = () => {
  const {splitRef} = useSplit()
  const {setSizes} = SizesContainer.useContainer()

  const handleDrag = debounce(sizes => {
    setSizes(sizes)
  }, 50)

  return (
    <Pane
      is={Split}
      ref={splitRef}
      sizes={[50, 50]}
      minSize={100}
      direction='vertical'
      height='100vh'
      onDrag={handleDrag}
    >
      <Editor/>

      <Pane
        position='relative'
      >
        <Toolbar
          position='absolute'
          width='100%'
          top={0}
          zIndex={1}
        />
        <OutputTabView/>
      </Pane>
    </Pane>
  )
}

export default EditorPage
