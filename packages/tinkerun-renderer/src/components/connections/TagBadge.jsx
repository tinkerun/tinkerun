import PropTypes from 'prop-types'
import {Badge} from 'evergreen-ui'

import {tagColor} from '../../utils/tagColor'

const TagBadge = ({tag}) => (
  <Badge
    color={tagColor(tag)}
    fontSize={10}
  >
    {tag}
  </Badge>
)

TagBadge.propTypes = {
  tag: PropTypes.string.isRequired,
}

export default TagBadge
