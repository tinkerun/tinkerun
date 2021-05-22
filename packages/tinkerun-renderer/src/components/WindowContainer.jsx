import PropTypes from 'prop-types'

import LanguageProvider from './LanguageProvider'
import RouterProvider from './RouterProvider'
import ConfigProvider from './ConfigProvider'
import ThemeProvider from './ThemeProvider'

const WindowContainer = ({children}) => (
  <LanguageProvider>
    <RouterProvider>
      <ConfigProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </ConfigProvider>
    </RouterProvider>
  </LanguageProvider>
)

WindowContainer.propTypes = {
  children: PropTypes.element.isRequired,
}

export default WindowContainer
