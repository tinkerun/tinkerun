import {Pane} from 'evergreen-ui'

import ConnectionProvider from '../ConnectionProvider'
import Output from './Output'
import OutputContainer from './OutputContainer'
import Terminal from './Terminal'

const OutputView = () => {
  const {tabIndex} = OutputContainer.useContainer()

  return (
    <Pane
      position='relative'
      height={400}
    >
      <Pane
        display={tabIndex === 0 ? 'block' : 'none'}
      >
        <ConnectionProvider>
          <Output/>
        </ConnectionProvider>
      </Pane>

      <Pane
        display={tabIndex === 1 ? 'block' : 'none'}
      >
        <Terminal/>
      </Pane>

    </Pane>
  )
}

export default OutputView
