import PropTypes from 'prop-types'
import {ThemeProvider as UIThemeProvider, classicTheme, defaultTheme} from 'evergreen-ui'
import {useAtomValue} from 'jotai/utils'

import {configAtom} from '../stores/config'

const ThemeProvider = ({children}) => {
  const config = useAtomValue(configAtom)

  const getTheme = (theme) => {
    switch (theme) {
      case 'classic':
        return classicTheme
      default:
        return defaultTheme
    }
  }

  return (
    <UIThemeProvider
      value={getTheme(config.theme)}
    >
      {children}
    </UIThemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default ThemeProvider
