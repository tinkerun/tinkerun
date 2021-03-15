import PropTypes from 'prop-types'
import {Pane} from 'evergreen-ui'

import Field from '../Field'
import ConnectButton from './ConnectButton'
import OverSSHButton from './OverSSHButton'
import SSHForm from './SSHForm'
import BasicForm from './BasicForm'
import {useCallback, useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import debounce from 'lodash/debounce'

const ConnectionForm = ({onSubmit}) => {
  const {watch} = useFormContext()

  const data = watch()

  // debounce the update
  // https://www.synthace.com/autosave-with-react-hooks/
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(dataNew => {
      onSubmit(dataNew)
    }, 500),
    [],
  )

  // auto save connections
  useEffect(() => {
    if (data.id) {
      debouncedSave(data)
    }
  }, [data])

  return (
    <Pane>
      <BasicForm/>
      <SSHForm/>

      <Pane
        display='flex'
        justifyContent='space-between'
      >
        <Field
          marginBottom={0}
        >
          <OverSSHButton/>
        </Field>

        <ConnectButton/>
      </Pane>
    </Pane>
  )
}

ConnectionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ConnectionForm
