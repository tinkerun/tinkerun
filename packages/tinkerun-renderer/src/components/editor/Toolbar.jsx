import {Pane, majorScale} from 'evergreen-ui'

import SettingButton from './SettingButton'
import RunButton from './RunButton'

const Toolbar = () => (
  <Pane
    display='flex'
    justifyContent='space-between'
    paddingX={majorScale(2)}
    paddingY={majorScale(1)}
  >
    <Pane>
      <SettingButton/>
    </Pane>

    <Pane>
      <RunButton/>
    </Pane>

  </Pane>
)

export default Toolbar
