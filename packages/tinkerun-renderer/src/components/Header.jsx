import PropTypes from 'prop-types'
import {majorScale, Pane} from 'evergreen-ui'

const Header = ({children, ...props}) => (
  <Pane
    display='flex'
    justifyContent='space-between'
    paddingX={majorScale(2)}
    paddingY={majorScale(1)}
    alignItems='center'
    height={majorScale(4)}
    boxSizing='content-box'
    {...props}
  >
    {children}
  </Pane>
)

Header.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Header
