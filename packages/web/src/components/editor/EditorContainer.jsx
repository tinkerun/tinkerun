import {useState} from 'react'
import {createContainer} from 'unstated-next'

const useEditor = (initialState = '') => {
  const [code, setCode] = useState(initialState)

  return {
    code, setCode,
  }
}

export default createContainer(useEditor)
