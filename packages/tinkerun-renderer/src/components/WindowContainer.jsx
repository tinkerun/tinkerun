import PropTypes from 'prop-types'

import LanguageProvider from './LanguageProvider'
import RouterProvider from './RouterProvider'
import ConfigProvider from './ConfigProvider'

const WindowContainer = ({children}) => (
  <LanguageProvider>
    <RouterProvider>
      <ConfigProvider>
        {children}
      </ConfigProvider>
    </RouterProvider>
  </LanguageProvider>
)

WindowContainer.propTypes = {
  children: PropTypes.element.isRequired,
}

export default WindowContainer
