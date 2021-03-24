import {Route, Switch} from 'wouter'
import {Pane} from 'evergreen-ui'
import Split from 'react-split'
import {useUpdateAtom} from 'jotai/utils'
import throttle from 'lodash/throttle'

import EditorPage from './components/EditorPage'
import WindowContainer from './components/WindowContainer'
import Sidebar from './components/editor/Sidebar'
import Inspire from './components/Inspire'
import Toolbar from './components/editor/Toolbar'
import OutputTabView from './components/editor/OutputTabView'
import useSplit from './hooks/useSplit'
import {sizesAtom} from './stores/editor'

const EditorWindow = () => {
  const {splitRef} = useSplit()
  const setSizes = useUpdateAtom(sizesAtom)

  const handleDrag = throttle(sizes => {
    setSizes(sizes)
  }, 50)

  return (
    <WindowContainer>
      <Pane
        display='flex'
      >
        <Sidebar/>
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
          width='100%'
          onDrag={handleDrag}
          flex={1}
        >
          <Pane
            height='100vh'
          >
            <Switch>
              <Route path='/' component={Inspire}/>
              <Route path='/snippets/:id' component={EditorPage}/>
            </Switch>
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
      </Pane>
    </WindowContainer>
  )
}

export default EditorWindow
