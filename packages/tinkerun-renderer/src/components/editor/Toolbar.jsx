import {Pane, majorScale} from 'evergreen-ui'

import RunButton from './RunButton'
import OutputTab from './OutputTab'

const Toolbar = () => (
  <Pane
    display='flex'
    justifyContent='space-between'
    paddingX={majorScale(2)}
    paddingY={majorScale(1)}
    borderTop
    borderBottom
  >
    <Pane>
      <OutputTab/>
    </Pane>

    <Pane>
      <RunButton/>
    </Pane>

  </Pane>
)

export default Toolbar
