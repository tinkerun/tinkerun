import {FormFieldLabel, majorScale, Pane} from 'evergreen-ui'
import PropTypes from 'prop-types'

const Field = ({label, children, ...rest}) => (
  <Pane
    display='flex'
    alignItems='center'
    marginBottom={16}
    {...rest}
  >
    <FormFieldLabel
      size={300}
      marginRight={majorScale(1)}
      width={70}
      textAlign='right'
      flexShrink={0}
    >
      {label}
    </FormFieldLabel>
    {children}
  </Pane>
)

Field.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
}

Field.defaultProps = {
  label: '',
}

export default Field
