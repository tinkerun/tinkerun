import PropTypes from 'prop-types'
import {majorScale, Text, Tooltip as EvergreenTooltip} from 'evergreen-ui'

const Tooltip = ({children, content}) => (
  <EvergreenTooltip
    content={(
      <Text
        color='white'
        size={300}
        lineHeight={`${majorScale(3)}px`}
        display='block'
      >
        {content}
      </Text>
    )}
    statelessProps={{
      height: majorScale(3),
      paddingY: 0,
    }}
  >
    {children}
  </EvergreenTooltip>
)

Tooltip.propTypes = {
  children: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired,
}

export default Tooltip
