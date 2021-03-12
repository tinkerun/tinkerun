import PropTypes from 'prop-types'
import {Text, majorScale, Table, CloudIcon, DesktopIcon, Pane} from 'evergreen-ui'
import {useLocation, useRoute} from 'wouter'

import TagBadge from './TagBadge'
import {popupConnectionContextMenu} from '../../utils/api'

const {Row, Cell} = Table

const ConnectionItem = ({connection}) => {
  const [match, params] = useRoute('/connections/:id')
  const [, setLocation] = useLocation()

  const handleSelect = () => {
    setLocation(`/connections/${connection.id}`)
  }

  const handleContextMenu = () => {
    popupConnectionContextMenu(connection.id)
  }

  return (
    <Row
      onSelect={handleSelect}
      onContextMenu={handleContextMenu}
      isSelected={match && (params.id === connection.id)}
      userSelect='none'
      isSelectable
    >
      <Cell
        paddingX={majorScale(2)}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >

        <Pane
          display='flex'
          alignItems='center'
        >
          <Pane
            flexShrink={1}
          >
            {
              connection.is_over_ssh
                ? <CloudIcon size={10}/>
                : <DesktopIcon size={10}/>
            }
          </Pane>

          <Text
            marginLeft={8}
            size={300}
          >
            {connection.name}
          </Text>
        </Pane>

        {connection.tag && (
          <TagBadge
            tag={connection.tag}
          />
        )}
      </Cell>
    </Row>
  )
}

ConnectionItem.propTypes = {
  connection: PropTypes.object.isRequired,
}

export default ConnectionItem
