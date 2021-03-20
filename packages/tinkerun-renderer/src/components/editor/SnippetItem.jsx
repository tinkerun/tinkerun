import PropTypes from 'prop-types'
import {majorScale, Table} from 'evergreen-ui'
import {useLocation, useRoute} from 'wouter'

const {Row, TextCell} = Table

const SnippetItem = ({snippet}) => {
  const [match, params] = useRoute('/snippets/:id')
  const [, setLocation] = useLocation()

  const handleSelect = () => {
    setLocation(`/snippets/${snippet.id}`)
  }

  return (
    <Row
      height={majorScale(4)}
      onSelect={handleSelect}
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
