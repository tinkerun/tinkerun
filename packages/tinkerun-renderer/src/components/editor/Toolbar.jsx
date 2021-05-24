import {Pane, majorScale} from 'evergreen-ui'

import OutputTab from './OutputTab'
import ReconnectButton from './ReconnectButton'

const Toolbar = (props) => (
  <Pane
    height={50}
    width='100%'
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    paddingX={majorScale(2)}
    paddingY={majorScale(1)}
    backgroundColor='white'
    borderTop
    {...props}
  >
    <OutputTab/>
    <ReconnectButton/>
  </Pane>
)

export default Toolbar
