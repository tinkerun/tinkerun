import {Button, majorScale} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {Controller, useFormContext} from 'react-hook-form'

import {selectFile} from '../../utils/api'

const SSHKeyButton = () => {
  const {control} = useFormContext()

  return (
    <Controller
      name='ssh_key'
      control={control}
      defaultValue={''}
      render={({value, onChange}) => {
        return (
          <Button
            height={majorScale(3)}
            onClick={() => onChange(selectFile())}
            intent={value === '' ? 'none' : 'success'}
          >
            {value
              ? value.split('/').pop()
              : <FormattedMessage id='connections.import_ssh_key'/>
            }

          </Button>
        )
      }}
    />
  )
}

export default SSHKeyButton
