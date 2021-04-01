import {FormFieldLabel, majorScale, Pane} from 'evergreen-ui'
import PropTypes from 'prop-types'

const Field = ({label, labelWidth, children, ...rest}) => (
  <Pane
    display='flex'
    alignItems='center'
    marginBottom={16}
    {...rest}
  >
    <FormFieldLabel
      size={300}
      marginRight={majorScale(1)}
      width={labelWidth}
      textAlign='right'
      flexShrink={0}
    >
      {label}
    </FormFieldLabel>
    {children}
  </Pane>
)

Field.propTypes = {
  label: PropTypes.any,
  labelWidth: PropTypes.number,
  children: PropTypes.element.isRequired,
}

Field.defaultProps = {
  label: '',
  labelWidth: 70,
}

export default Field
