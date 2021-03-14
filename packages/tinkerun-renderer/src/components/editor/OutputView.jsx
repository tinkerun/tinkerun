import {majorScale, Pane} from 'evergreen-ui'

import ConnectionProvider from '../ConnectionProvider'
import Output from './Output'
import OutputContainer from './OutputContainer'
import Terminal from './Terminal'

const OutputView = (props) => {
  const {tabIndex} = OutputContainer.useContainer()

  const tabStyle = isDisplay => {
    const base = {
      height: '100%',
    }

    if (isDisplay) {
      return base
    }

    return {
      ...base,
      visibility: 'hidden',
      position: 'absolute',
      zIndex: -999,
    }
  }

  return (
    <Pane
      position='relative'
      padding={majorScale(1)}
      {...props}
    >
      <Pane
        {...tabStyle(tabIndex === 0)}
      >
        <ConnectionProvider>
          <Output/>
        </ConnectionProvider>
      </Pane>

      <Pane
        {...tabStyle(tabIndex === 1)}
      >
        <Terminal/>
      </Pane>
    </Pane>
  )
}

export default OutputView
