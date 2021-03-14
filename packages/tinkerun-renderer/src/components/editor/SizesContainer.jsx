import {createContainer} from 'unstated-next'
import {useState} from 'react'

const useSizes = () => {
  const [sizes, setSizes] = useState([])

  return {
    sizes,
    setSizes,
  }
}

export default createContainer(useSizes)
