import {useCallback} from 'react'
import {FormFieldLabel, majorScale, Text, TextInputField} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import debounce from 'lodash/debounce'

import DefaultCommandTooltip from './DefaultCommandTooltip'
import {configAtom, setConfigAtom} from '../../stores/config'

const DefaultCommandField = () => {
  const config = useAtomValue(configAtom)
  const setConfig = useUpdateAtom(setConfigAtom)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setConfigBounced = useCallback(debounce(value => {
    setConfig({
      command_default: value,
    })
  }, 200), [])

  const handleChange = e => {
    setConfigBounced(e.target.value)
  }

  return (
    <TextInputField
      label={
        <FormFieldLabel
          display='flex'
          alignItems='center'
        >
          <Text
            marginRight={4}
            fontWeight={500}
          >
            <FormattedMessage id='preference.default_command'/>
          </Text>
          <DefaultCommandTooltip/>
        </FormFieldLabel>
      }
      onChange={handleChange}
      inputHeight={majorScale(3)}
      defaultValue={config.command_default}
    />
  )
}

export default DefaultCommandField
