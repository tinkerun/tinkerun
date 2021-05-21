import PropTypes from 'prop-types'
import {Router} from 'wouter'

import useHashLocation from '../utils/useHashLocation'
import routeMatcher from '../utils/routeMatcher'

const RouterProvider = ({children}) => (
  <Router
    hook={useHashLocation}
    matcher={routeMatcher}
  >
    {children}
  </Router>
)

RouterProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default RouterProvider
