import {majorScale, Select} from 'evergreen-ui'
import {Controller, useFormContext} from 'react-hook-form'

const TagSelector = () => {
  const {control} = useFormContext()

  return (
    <Controller
      name='tag'
      control={control}
      defaultValue='local'
      render={({
        field: {value, onChange},
      }) =>
        <Select
          height={majorScale(3)}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          <option value="local">local</option>
          <option value="testing">testing</option>
          <option value="development">development</option>
          <option value="staging">staging</option>
          <option value="production">production</option>
        </Select>
      }
    />
  )
}

export default TagSelector
