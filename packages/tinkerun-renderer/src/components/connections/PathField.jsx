import {Button, majorScale, Pane, TextInput} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'
import {useFormContext} from 'react-hook-form'

import Field from '../Field'
import {selectDirectory} from '../../utils/api'

const PathField = () => {
  const intl = useIntl()
  const {errors, watch, setValue, register} = useFormContext()

  const isOverSSH = watch('is_over_ssh')

  return (
    <Pane
      display='flex'
    >
      <Field
        label={intl.formatMessage({id: 'connections.path'})}
        flex={1}
      >
        <TextInput
          height={majorScale(3)}
          placeholder='/var/www/html'
          width='100%'
          name='path'
          ref={register}
          isInvalid={Boolean(errors.path)}
        />
      </Field>

      {!isOverSSH && (
        <Button
          height={majorScale(3)}
          marginLeft={16}
          flexShrink={0}
          onClick={() => setValue('path', selectDirectory())}
        >
          <FormattedMessage id='connections.select_directory'/>
        </Button>
      )}
    </Pane>
  )
}

export default PathField
