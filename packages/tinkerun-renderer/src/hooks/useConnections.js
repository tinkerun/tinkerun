import {useState} from 'react'

const useConnections = (initialState = []) => {
  const [connections, setConnections] = useState(initialState)

  const getConnection = id => connections.find(c => c.id === id)

  const createConnection = connection => {
    setConnections(prevState => (
      [
        ...prevState,
        connection,
      ]
    ))
  }

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

  const deleteConnection = id => {
    setConnections(prevState => prevState.filter(c => c.id !== id))
  }

  return {
    connections,
    getConnection,
    updateConnection,
    deleteConnection,
    createConnection,
  }
}

export default useConnections
