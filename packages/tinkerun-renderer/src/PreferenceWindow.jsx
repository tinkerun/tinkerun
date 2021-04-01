import {Pane} from 'evergreen-ui'

import PreferenceTab from './components/preference/PreferenceTab'
import PreferenceForm from './components/preference/PreferenceForm'
import WindowContainer from './components/WindowContainer'

const PreferenceWindow = () => {
  return (
    <WindowContainer>
      <Pane
        display='flex'
      >
        <PreferenceTab/>
        <PreferenceForm/>
      </Pane>
    </WindowContainer>
  )
}

export default PreferenceWindow
