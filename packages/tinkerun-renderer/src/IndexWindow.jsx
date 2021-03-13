import {useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import Split from 'react-split'
import {Route, Switch} from 'wouter'

import Sidebar from './components/connections/Sidebar'
import Inspire from './components/Inspire'
import ConnectionPage from './components/ConnectionPage'
import WindowContainer from './components/WindowContainer'

const IndexWindow = () => {
  const splitRef = useRef()

  useEffect(() => {
    const listener = (e) => {
      const split = splitRef.current.split
      // https://github.com/nathancahill/split/issues/87#issuecomment-311248421
      split.setSizes(split.getSizes())
    }

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  return (
    <WindowContainer>
      <Pane
        is={Split}
        display='flex'
        sizes={[45, 55]}
        minSize={260}
        ref={splitRef}
      >
        <Sidebar/>
        <Switch>
          <Route path='/' component={Inspire}/>
          <Route path='/connections/:id' component={ConnectionPage}/>
        </Switch>
      </Pane>
    </WindowContainer>
  )
}

export default IndexWindow
