import {majorScale, Pane} from 'evergreen-ui'

import OutputTabContainer from './OutputTabContainer'
import Output from './Output'
import Terminal from './Terminal'

const OutputTabView = (props) => {
  const {tabIndex} = OutputTabContainer.useContainer()

  const tabStyle = isDisplay => {
    const base = {
      height: 'inherit',
      paddingBottom: majorScale(1),
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
      backgroundColor='white'
      paddingX={majorScale(2)}
      height='100%'
      paddingTop={50}
      {...props}
    >
      <Pane
        {...tabStyle(tabIndex === 0)}
      >
        <Output/>
      </Pane>

      <Pane
        {...tabStyle(tabIndex === 1)}
      >
        <Terminal/>
      </Pane>
    </Pane>
  )
}

export default OutputTabView
