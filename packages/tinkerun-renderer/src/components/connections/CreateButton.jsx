import {Tooltip, Text, PlusIcon, majorScale, IconButton} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'
import {useLocation} from 'wouter'
import {nanoid} from 'nanoid'
import {useUpdateAtom} from 'jotai/utils'

import {createConnectionAtom} from '../../stores/connections'

const CreateButton = () => {
  const [, setLocation] = useLocation()
  const createConnection = useUpdateAtom(createConnectionAtom)
  const intl = useIntl()

  const handleClick = () => {
    const connection = {
      id: nanoid(),
      tag: 'local',
      name: intl.formatMessage({id: 'connections.name_default'}),
      is_over_ssh: false,
      path: '',
      command: '',
    }

    createConnection(connection)

    setLocation(`/connections/${connection.id}`)
  }

  return (
    <Tooltip
      content={(
        <Text
          color='white'
          size={300}
          lineHeight={`${majorScale(3)}px`}
          display='block'
        >
          <FormattedMessage id='connections.create'/>
        </Text>
      )}
      statelessProps={{
        height: majorScale(3),
        paddingY: 0,
      }}
    >
      <IconButton
        icon={PlusIcon}
        height={majorScale(3)}
        onClick={handleClick}
        appearance='minimal'
      >
        <FormattedMessage id='connections.create'/>
      </IconButton>
    </Tooltip>
  )
}

export default CreateButton
