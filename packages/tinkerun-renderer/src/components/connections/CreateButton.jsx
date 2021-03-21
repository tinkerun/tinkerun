import {PlusIcon, majorScale, IconButton} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'
import {useLocation} from 'wouter'
import {nanoid} from 'nanoid'
import {useUpdateAtom} from 'jotai/utils'

import Tooltip from '../Tooltip'
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
        <FormattedMessage id='connections.create'/>
      )}
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
