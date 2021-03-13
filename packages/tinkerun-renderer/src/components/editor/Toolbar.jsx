import {Pane, majorScale} from 'evergreen-ui'

import RunButton from './RunButton'

const Toolbar = () => (
  <Pane
    display='flex'
    justifyContent='space-between'
    paddingX={majorScale(2)}
    paddingY={majorScale(1)}
  >
    <Pane>
    </Pane>

    <Pane>
      <RunButton/>
    </Pane>

  </Pane>
)

export default Toolbar
