import {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, FormField, majorScale, Pane} from 'evergreen-ui'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import KeyCode from './KeyCode'
import ShortcutCaptureDialog from './ShortcutCaptureDialog'
import {configAtom, setConfigAtom} from '../../stores/config'

const ShortcutField = ({label, description, configKey}) => {
  const config = useAtomValue(configAtom)
  const setConfig = useUpdateAtom(setConfigAtom)

  const [isShown, setIsShown] = useState(false)

  const handleEnter = (keys) => {
    setConfig({
      [configKey]: keys,
    })
  }

  return (
    <Pane>
      <FormField
        label={label}
        description={description}
      >
        <Button
          onClick={() => setIsShown(true)}
          height={majorScale(3)}
        >
          {config[configKey].map(key => (
            <KeyCode
              key={`${configKey}_keys_${key}`}
              value={key}
              marginTop={0}
              appearance='minimal'
            />
          ))}
        </Button>
      </FormField>

      {isShown && (
        <ShortcutCaptureDialog
          defaultValue={config[configKey]}
          onEnter={handleEnter}
          onCloseComplete={() => setIsShown(false)}
        />
      )}

    </Pane>
  )
}

ShortcutField.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  configKey: PropTypes.string.isRequired,
}

export default ShortcutField
