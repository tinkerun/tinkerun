import {useState} from 'react'
import PropTypes from 'prop-types'
import {Heading, majorScale, Pane, TextInput} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'

import KeyCode from './KeyCode'

const ShortcutCaptureForm = ({defaultValue, close, onEnter}) => {
  const [keys, setKeys] = useState(defaultValue)
  const [isRecording, setIsRecording] = useState(false)

  const pushKey = key => {
    setKeys(prevKeys => {
      if (prevKeys.indexOf(key) === -1) {
        return [
          ...prevKeys,
          key,
        ]
      }

      return prevKeys
    })
  }

  const handleChange = e => {
    e.preventDefault()
  }

  const handleKeyDown = e => {
    e.preventDefault()

    if (e.key === 'Enter') {
      // 关闭并且保存
      onEnter(keys)
      close()
      return
    }

    if (e.key === 'Escape') {
      close()
      return
    }

    if (!isRecording) {
      setKeys([])
      setIsRecording(true)
    }

    pushKey(e.key)
  }

  const handleKeyUp = e => {
    e.preventDefault()
    setIsRecording(false)
  }

  return (
    <Pane
      textAlign='center'
    >
      <Heading
        size={200}
        marginBottom={majorScale(1)}
      >
        <FormattedMessage id='preference.shortcut_capture_label'/>
      </Heading>

      <TextInput
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={close}
        onKeyUp={handleKeyUp}
        value={keys.join('+')}
        width='100%'
        textAlign='center'
        marginBottom={0}
        autoFocus
      />

      <Pane marginTop={majorScale(1)}>
        {keys.map(key => (
          <KeyCode
            key={`keys_${key}`}
            value={key}
          />
        ))}
      </Pane>
    </Pane>
  )
}

ShortcutCaptureForm.propTypes = {
  defaultValue: PropTypes.array,
  close: PropTypes.func,
  onEnter: PropTypes.func.isRequired,
}

ShortcutCaptureForm.defaultProps = {
  defaultValue: [],
  close: () => false,
}

export default ShortcutCaptureForm
