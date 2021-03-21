import {render} from 'react-dom'
import {Provider} from 'jotai'

import IndexWindow from './IndexWindow'

render(
  <Provider>
    <IndexWindow/>
  </Provider>
  ,
  document.querySelector('#app'),
)
