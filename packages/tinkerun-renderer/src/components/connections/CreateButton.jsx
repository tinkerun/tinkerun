import {useEffect} from 'react'
import {PlusIcon, majorScale, IconButton} from 'evergreen-ui'
import {FormattedMessage, useIntl} from 'react-intl'
import {useLocation} from 'wouter'
import {nanoid} from 'nanoid'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import Tooltip from '../Tooltip'
import {createConnectionAtom} from '../../stores/connections'
import {configAtom} from '../../stores/config'
import {isMatchShortcut} from '../../utils/isMatchShortcut'

const CreateButton = () => {
  const [, setLocation] = useLocation()
  const createConnection = useUpdateAtom(createConnectionAtom)
  const config = useAtomValue(configAtom)
  const intl = useIntl()

  useEffect(() => {
    const listener = e => {
      const tagName = e.target.tagName

      if (
        tagName.isContentEditable ||
        tagName === 'INPUT' ||
        tagName === 'SELECT' ||
        tagName === 'TEXTAREA'
      ) {
        return false
      }

      if (isMatchShortcut(e, config.shortcut_new_connection)) {
        handleClick()
      }
    }
    document.addEventListener('keydown', listener, false)

    return () => {
      document.removeEventListener('keydown', listener, false)
    }
  }, [config.shortcut_new_connection])

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
