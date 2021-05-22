import {useCallback} from 'react'
import PropTypes from 'prop-types'
import {majorScale, TextInputField} from 'evergreen-ui'
import debounce from 'lodash/debounce'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import {configAtom, setConfigAtom} from '../../stores/config'

const GeneralField = ({label, description, configKey}) => {
  const config = useAtomValue(configAtom)
  const setConfig = useUpdateAtom(setConfigAtom)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setConfigBounced = useCallback(debounce(value => {
    setConfig({
      [configKey]: value,
    })
  }, 200), [])

  const handleChange = e => {
    setConfigBounced(e.target.value)
  }

  return (
    <TextInputField
      label={label}
      description={description}
      onChange={handleChange}
      inputHeight={majorScale(3)}
      defaultValue={config[configKey]}
    />
  )
}

GeneralField.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  configKey: PropTypes.string.isRequired,
}

export default GeneralField
