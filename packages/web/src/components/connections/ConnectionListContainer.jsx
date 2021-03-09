import {useState} from 'react'
import {createContainer} from 'unstated-next'

const useConnections = (initialState = {}) => {
  const [connections, setConnections] = useState(Object.values(initialState))

  const updateConnection = connection => {
    setConnections(prevState => (
      prevState.map(c => {
        if (c.id === connection.id) {
          return connection
        }

        return c
      })
    ))
  }

  const deleteConnection = connection => {
    setConnections(prevState => (
      prevState.filter(c => c.id !== connection.id)
    ))
  }

  return {
    connections,
    updateConnection,
    deleteConnection,
  }
}

export default createContainer(useConnections)
