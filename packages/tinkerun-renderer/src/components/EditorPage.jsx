import {Pane} from 'evergreen-ui'
import Split from 'react-split'
import debounce from 'lodash/debounce'
import {useUpdateAtom} from 'jotai/utils'

import Editor from './editor/Editor'
import Toolbar from './editor/Toolbar'
import OutputTabView from './editor/OutputTabView'
import EditorHeader from './editor/EditorHeader'
import useSplit from '../hooks/useSplit'
import {sizesAtom} from '../stores/editor'

const EditorPage = () => {
  const {splitRef} = useSplit()
  const setSizes = useUpdateAtom(sizesAtom)

  const handleDrag = debounce(sizes => {
    setSizes(sizes)
  }, 50)

  return (
    <Pane
      is={Split}
      ref={splitRef}
      sizes={[50, 50]}
      minSize={100}
      gutterStyle={() => ({
        height: '10px',
        'z-index': 2,
      })}
      direction='vertical'
      height='100vh'
      onDrag={handleDrag}
    >
      <Pane
        position='relative'
        display='flex'
        flexDirection='column'
      >
        <EditorHeader/>
        <Editor/>
      </Pane>

      <Pane
        position='relative'
      >
        <Toolbar
          position='absolute'
          top={-10}
          zIndex={1}
        />
        <OutputTabView/>
      </Pane>
    </Pane>
  )
}

export default EditorPage
