import {render} from 'react-dom'
import {Provider} from 'jotai'

import EditorWindow from './EditorWindow'

render(
  <Provider>
    <EditorWindow/>
  </Provider>,
  document.querySelector('#app'),
)
