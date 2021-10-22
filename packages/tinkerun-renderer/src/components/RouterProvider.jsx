import PropTypes from 'prop-types'
import {Router} from 'wouter'

import useHashLocation from '../utils/useHashLocation'

const RouterProvider = ({children}) => (
  <Router
    hook={useHashLocation}
  >
    {children}
  </Router>
)

RouterProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default RouterProvider
