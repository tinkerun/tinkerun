import {Tooltip, Text, PlusIcon, majorScale, IconButton} from 'evergreen-ui'
import {FormattedMessage} from 'react-intl'
import {useLocation} from 'wouter'

import {createConnection} from '../../utils/api'

const CreateButton = () => {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    const id = createConnection()
    setLocation(`/connections/${id}`)
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
