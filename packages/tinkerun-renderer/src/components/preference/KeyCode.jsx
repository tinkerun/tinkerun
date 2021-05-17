import PropTypes from 'prop-types'
import {
  Code,
  KeyCommandIcon,
  KeyControlIcon,
  KeyEscapeIcon,
  KeyOptionIcon,
  KeyShiftIcon,
  KeyTabIcon,
  majorScale,
} from 'evergreen-ui'

const KeyCode = ({value, ...rest}) => {
  const renderValue = () => {
    switch (value) {
      case 'Meta':
        return <KeyCommandIcon size={10}/>
      case 'Control':
        return <KeyControlIcon size={10}/>
      case 'Shift':
        return <KeyShiftIcon size={10}/>
      case 'Escape':
        return <KeyEscapeIcon size={10}/>
      case 'Alt':
        return <KeyOptionIcon size={10}/>
      case 'Tab':
        return <KeyTabIcon size={10}/>
      default:
        return value
    }
  }

  return (
    <Code
      size={300}
      marginTop={majorScale(1)}
      marginRight={4}
      textTransform='uppercase'
      {...rest}
    >
      {renderValue()}
    </Code>
  )
}

KeyCode.propTypes = {
  value: PropTypes.string.isRequired,
}

export default KeyCode
