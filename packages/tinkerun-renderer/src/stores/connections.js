import {atom} from 'jotai'
import {atomWithImmer} from 'jotai/immer'

import {allConnections, createConnection, deleteConnection, updateConnection} from '../utils/api'

const connectionDataAtom = atomWithImmer(allConnections())

const connectionListAtom = atom(get => Object.values(get(connectionDataAtom)))

const createConnectionAtom = atom(null, (get, set, connection) => {
  set(connectionDataAtom, data => {
    data[connection.id] = connection
  })

  createConnection(get(connectionDataAtom)[connection.id])
})

const deleteConnectionAtom = atom(null, (get, set, id) => {
  set(connectionDataAtom, data => {
    delete data[id]
  })

  deleteConnection(id)
})

const updateConnectionAtom = atom(null, (get, set, connection) => {
  set(connectionDataAtom, data => {
    if (data[connection.id]) {
      data[connection.id] = connection
    }
  })

  updateConnection(connection)
})

const connectionAtoms = {}

const connectionAtomWithId = id => {
  if (!connectionAtoms[id]) {
    connectionAtoms[id] = atom(get => get(connectionDataAtom)[id])
  }

  return connectionAtoms[id]
}

export {
  connectionDataAtom,
  connectionListAtom,
  createConnectionAtom,
  deleteConnectionAtom,
  updateConnectionAtom,
  connectionAtomWithId,
}
