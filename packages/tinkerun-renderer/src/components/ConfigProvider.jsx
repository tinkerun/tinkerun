import {useEffect} from 'react'
import {useImmerAtom} from 'jotai/immer'

import {onSetConfig} from '../utils/api'
import {configAtom} from '../stores/config'

const ConfigProvider = ({children}) => {
  const [, setConfig] = useImmerAtom(configAtom)

  useEffect(() => {
    const onSet = onSetConfig(update => {
      setConfig(config => {
        for (const k in update) {
          config[k] = update[k]
        }
      })
    })

    return () => {
      onSet.dispose()
    }
  }, [])

  return children
}

export default ConfigProvider
