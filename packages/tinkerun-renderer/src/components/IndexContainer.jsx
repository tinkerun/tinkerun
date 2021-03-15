import PropTypes from 'prop-types'

import ConnectionsContainer from './connections/ConnectionsContainer'
import {allConnections} from '../utils/api'

const IndexContainer = ({children}) => {
  const connections = Object.values(allConnections())

  return (
    <ConnectionsContainer.Provider initialState={connections}>
      {children}
    </ConnectionsContainer.Provider>
  )
}

IndexContainer.propTypes = {
  children: PropTypes.any.isRequired,
}

export default IndexContainer
