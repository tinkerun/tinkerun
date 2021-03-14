import {useState} from 'react'
import {createContainer} from 'unstated-next'

const useOutputTab = (initialState = 0) => {
  const [tabIndex, setTabIndex] = useState(initialState)

  const setOutputMode = () => setTabIndex(0)
  const setTerminalMode = () => setTabIndex(1)

  return {
    tabIndex,
    setTabIndex,
    setOutputMode,
    setTerminalMode,
  }
}

export default createContainer(useOutputTab)
