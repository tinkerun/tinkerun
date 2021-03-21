import {Pane, majorScale} from 'evergreen-ui'

import OutputTab from './OutputTab'

const Toolbar = (props) => (
  <Pane
    height={50}
    width='100%'
    display='flex'
    alignItems='center'
    paddingX={majorScale(2)}
    paddingY={majorScale(1)}
    backgroundColor='white'
    borderTop
    {...props}
  >
    <OutputTab/>
  </Pane>
)

export default Toolbar
