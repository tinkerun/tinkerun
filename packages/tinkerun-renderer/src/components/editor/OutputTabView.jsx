import {majorScale, Pane} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'

import Output from './Output'
import Terminal from './Terminal'
import {outputTabIndexAtom} from '../../stores/editor'

const OutputTabView = (props) => {
  const tabIndex = useAtomValue(outputTabIndexAtom)

  const paneStyle = isDisplay => {
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
      paddingTop={40}
      {...props}
    >
      <Pane
        {...paneStyle(tabIndex === 0)}
      >
        <Terminal/>
      </Pane>
      <Pane
        {...paneStyle(tabIndex === 1)}
      >
        <Output/>
      </Pane>
    </Pane>
  )
}

export default OutputTabView
