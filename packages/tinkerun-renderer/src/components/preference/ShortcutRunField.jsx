import {useState} from 'react'
import {Button, Dialog, FormField, majorScale, Pane} from 'evergreen-ui'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import ShortcutCaptureForm from './ShortcutCaptureForm'
import KeyCode from './KeyCode'
import {configAtom, setConfigAtom} from '../../stores/config'

const ShortcutRunField = () => {
  const config = useAtomValue(configAtom)
  const setConfig = useUpdateAtom(setConfigAtom)

  const [isShown, setIsShown] = useState(false)

  const handleEnter = (keys) => {
    setConfig({
      shortcut_run: keys,
    })
  }

  return (
    <Pane>
      <FormField
        label='Run'
        description='shortcut for run code in the editor'
      >
        <Button
          onClick={() => setIsShown(true)}
          height={majorScale(3)}
        >
          {config.shortcut_run.map(key => (
            <KeyCode
              key={`keys_${key}`}
              value={key}
              marginTop={0}
              appearance='minimal'
            />
          ))}
        </Button>
      </FormField>

      {isShown && (
        <Dialog
          hasFooter={false}
          hasHeader={false}
          isShown={true}
          onCloseComplete={() => setIsShown(false)}
        >
          {({close}) => (
            <ShortcutCaptureForm
              defaultValue={config.shortcut_run}
              onEnter={handleEnter}
              close={close}
            />
          )}
        </Dialog>
      )}
    </Pane>
  )
}

export default ShortcutRunField
