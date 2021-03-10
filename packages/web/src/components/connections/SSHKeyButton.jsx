import {Pane, Button, majorScale} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {Controller, useFormContext} from 'react-hook-form'

import SSHKeyTooltip from './SSHKeyTooltip'
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
          <Pane
            display='flex'
            alignItems='center'
          >
            <Button
              height={majorScale(3)}
              onClick={() => onChange(selectFile())}
              intent={value === '' ? 'none' : 'success'}
              marginRight={majorScale(1)}
            >
              {value
                ? value.split('/').pop()
                : <FormattedMessage id='connections.import_ssh_key'/>
              }
            </Button>

            <SSHKeyTooltip/>
          </Pane>
        )
      }}
    />
  )
}

export default SSHKeyButton
