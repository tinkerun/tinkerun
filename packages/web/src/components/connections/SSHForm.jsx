import {InlineAlert, majorScale, Small, TextInput} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'
import {useFormContext} from 'react-hook-form'

import Field from '../Field'
import SSHKeyButton from './SSHKeyButton'

const SSHForm = () => {
  const intl = useIntl()

  const {errors, register, watch} = useFormContext()

  const isOverSSH = watch('is_over_ssh')

  if (!isOverSSH) {
    return null
  }

  return (
    <>
      <Field>
        <InlineAlert
          size={300}
          marginTop={8}
          color="muted"
        >
          <FormattedMessage
            id='connections.over_ssh_desc'
            values={{
              // eslint-disable-next-line react/display-name
              small: chucks => <Small>{chucks}</Small>,
            }}
          />
        </InlineAlert>
      </Field>

      <Field
        label={intl.formatMessage({id: 'connections.ssh_server'})}
      >
        <TextInput
          placeholder='192.168.1.1'
          width='100%'
          height={majorScale(3)}
          name='ssh_server'
          isInvalid={Boolean(errors.server)}
          ref={register}
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
          ref={register}
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
          isInvalid={Boolean(errors.user)}
          ref={register}
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
