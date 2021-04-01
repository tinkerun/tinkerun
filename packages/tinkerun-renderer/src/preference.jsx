import {render} from 'react-dom'
import {Provider} from 'jotai'

import PreferenceWindow from './PreferenceWindow'

render(
  <Provider>
    <PreferenceWindow/>
  </Provider>
  ,
  document.querySelector('#app'),
)
