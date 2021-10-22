import PropTypes from 'prop-types'
import {majorScale, Table} from 'evergreen-ui'
import {useLocation, useRoute} from 'wouter'

import {popupSnippetContextMenu} from '../../utils/api'

const {Row, TextCell} = Table

const SnippetItem = ({snippet}) => {
  const [match, params] = useRoute('/snippets/:id/:mode')
  const [, setLocation] = useLocation()

  const handleSelect = () => {
    setLocation(`/snippets/${snippet.id}/editor`)
  }

  const handleContextMenu = () => {
    popupSnippetContextMenu(snippet.id)
  }

  return (
    <Row
      height={majorScale(4)}
      onSelect={handleSelect}
      onContextMenu={handleContextMenu}
      userSelect='none'
      isSelected={match && params.id === snippet.id}
      isSelectable
    >
      <TextCell>
        {snippet.name}
      </TextCell>
    </Row>
  )
}

SnippetItem.propTypes = {
  snippet: PropTypes.object.isRequired,
}

export default SnippetItem
