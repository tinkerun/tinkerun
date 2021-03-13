import PropTypes from 'prop-types'

import LanguageProvider from './LanguageProvider'
import RouterProvider from './RouterProvider'

const WindowContainer = ({children}) => (
  <LanguageProvider>
    <RouterProvider>
      {children}
    </RouterProvider>
  </LanguageProvider>
)

WindowContainer.propTypes = {
  children: PropTypes.element.isRequired,
}

export default WindowContainer
