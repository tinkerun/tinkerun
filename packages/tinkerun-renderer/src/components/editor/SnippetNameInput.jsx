import PropTypes from 'prop-types'
import {Pane} from 'evergreen-ui'
import {useCallback, useEffect, useState} from 'react'
import debounce from 'lodash/debounce'

const SnippetNameInput = ({value, onChange}) => {
  const [inputValue, setInputValue] = useState(value)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  onChange = useCallback(debounce(onChange, 100), [onChange])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleChange = e => {
    const v = e.target.value
    setInputValue(v)

    onChange(v)
  }

  return (
    <Pane
      is='input'
      value={inputValue}
      onChange={handleChange}
      height='100%'
      width='100%'
      fontSize={16}
      borderColor='transparent'
      outline='none'
    />
  )
}

SnippetNameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SnippetNameInput
