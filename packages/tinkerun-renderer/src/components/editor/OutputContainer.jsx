import {useState} from 'react'
import {createContainer} from 'unstated-next'

const useOutput = (initialState = 0) => {
  const [tabIndex, setTabIndex] = useState(initialState)

  return {
    tabIndex, setTabIndex,
  }
}

export default createContainer(useOutput)
