import {useFormContext} from 'react-hook-form'
import {useCallback, useEffect} from 'react'
import debounce from 'lodash/debounce'

import {updateConnection} from '../../utils/api'

const AutoSave = () => {
  const {watch} = useFormContext()

  const data = watch()

  // debounce the update
  // https://www.synthace.com/autosave-with-react-hooks/
  const save = useCallback(debounce(dataNew => {
    updateConnection(dataNew)
  }, 500), [])

  // auto save connections
  useEffect(() => {
    if (data.id) {
      save(data)
    }
  }, [data])

  return null
}

export default AutoSave
