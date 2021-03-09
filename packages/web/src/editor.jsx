import {render} from 'react-dom'
import {Route} from 'wouter'

import WindowContainer from './components/WindowContainer'
import EditorPage from './components/EditorPage'

render(
  (
    <WindowContainer>
        <Route path='/' component={EditorPage}/>
    </WindowContainer>
  ),
  document.querySelector('#app'),
)
