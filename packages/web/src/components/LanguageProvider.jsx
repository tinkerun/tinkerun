import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {IntlProvider} from 'react-intl'

import Loading from './Loading'
import {getIntlConfig, offSetIntlConfig, onSetIntlConfig} from '../utils/api'

const LanguageProvider = ({children}) => {
  const [intlConfig, setIntlConfig] = useState({})

  useEffect(() => {
    getIntlConfig()
    onSetIntlConfig(setIntlConfig)

    return () => {
      offSetIntlConfig()
    }
  }, [])

  if (!intlConfig.locale) {
    return <Loading/>
  }

  return (
    <IntlProvider
      locale={intlConfig.locale}
      messages={intlConfig.messages}
    >
      {children}
    </IntlProvider>
  )
}

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default LanguageProvider
