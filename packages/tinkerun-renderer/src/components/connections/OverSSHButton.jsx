import {Button, majorScale} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {Controller, useFormContext} from 'react-hook-form'

const OverSSHButton = props => {
  const {control} = useFormContext()

  return (
    <Controller
      name='is_over_ssh'
      control={control}
      defaultValue={false}
      render={({
        field: {value, onChange},
      }) => (
        <Button
          height={majorScale(3)}
          onClick={() => onChange(!value)}
          isActive={value}
          {...props}
        >
          <FormattedMessage id='connections.over_ssh'/>
        </Button>
      )}
    />
  )
}

export default OverSSHButton
