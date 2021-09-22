import {majorScale, TextInput} from 'evergreen-ui'
import {useIntl} from 'react-intl'
import {useFormContext} from 'react-hook-form'

import Field from '../Field'
import SSHKeyButton from './SSHKeyButton'

const SSHForm = () => {
  const intl = useIntl()

  const {register, watch} = useFormContext()

  const isOverSSH = watch('is_over_ssh')

  if (!isOverSSH) {
    return null
  }

  return (
    <>
      <Field
        label={intl.formatMessage({id: 'connections.ssh_server'})}
      >
        <TextInput
          placeholder='192.168.1.1'
          width='100%'
          height={majorScale(3)}
          name='ssh_server'
          {...register('ssh_server')}
        />
      </Field>

      <Field
        label={intl.formatMessage({id: 'connections.ssh_port'})}
        flexShrink={0}
      >
        <TextInput
          placeholder='22'
          width='100%'
          height={majorScale(3)}
          name='ssh_port'
          {...register('ssh_port')}
        />
      </Field>

      <Field
        label={intl.formatMessage({id: 'connections.ssh_user'})}
      >
        <TextInput
          width='100%'
          height={majorScale(3)}
          placeholder='root'
          name='ssh_user'
          {...register('ssh_user')}
        />
      </Field>

      <Field
        label={intl.formatMessage({id: 'connections.ssh_key'})}
      >
        <SSHKeyButton/>
      </Field>
    </>
  )
}

export default SSHForm
