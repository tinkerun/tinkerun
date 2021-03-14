import {Pane, majorScale} from 'evergreen-ui'

import RunButton from './RunButton'
import OutputTab from './OutputTab'

const Toolbar = (props) => (
  <Pane
    height={50}
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    paddingX={majorScale(2)}
    paddingY={majorScale(1)}
    borderTop
    {...props}
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
