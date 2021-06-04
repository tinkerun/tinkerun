import PropTypes from 'prop-types'
import {
  majorScale,
  SelectField,
  TextInputField,
  FormField as UIFormField,
  Checkbox,
  Switch,
  TextareaField,
} from 'evergreen-ui'
import isArray from 'lodash/isArray'

const FormField = ({field, onChange}) => {
  switch (field.type) {
    case 'select':
      return (
        <SelectField
          label={field.label || field.name}
          description={field.description}
          inputHeight={majorScale(3)}
          inputWidth={200}
          value={field.value}
          onChange={e => onChange(e.target.value)}
        >
          {(isArray(field.options) ? field.options : []).map((option, index) => (
            <option
              key={`${field.name}_options_${index}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </SelectField>
      )
    case 'checkbox':
      return (
        <UIFormField
          label={field.label || field.name}
        >
          <Checkbox
            label={field.description}
            checked={field.value === 'true'}
            onChange={e => onChange(e.target.checked ? 'true' : 'false')}
          />
        </UIFormField>
      )
    case 'switch':
      return (
        <UIFormField
          label={field.label || field.name}
          description={field.description}
          marginBottom={24}
        >
          <Switch
            checked={field.value === 'true'}
            onChange={e => onChange(e.target.checked ? 'true' : 'false')}
          />
        </UIFormField>
      )
    case 'textarea':
      return (
        <TextareaField
          label={field.label || field.name}
          description={field.description}
          value={field.value}
          onChange={e => onChange(e.target.value)}
        />
      )
    default:
      return (
        <TextInputField
          label={field.label || field.name}
          description={field.description}
          value={field.value}
          inputHeight={majorScale(3)}
          inputWidth={320}
          onChange={e => onChange(e.target.value)}
          type={field.type}
        />
      )
  }
}

FormField.propTypes = {
  field: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default FormField
