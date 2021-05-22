import {useLocation, useRoute} from 'wouter'
import {IconButton, FormIcon, majorScale} from 'evergreen-ui'
import {useIntl} from 'react-intl'

import Tooltip from '../Tooltip'

const FormButton = () => {
  const intl = useIntl()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/snippets/:id/:form?')
  const [matchFormRoute] = useRoute('/snippets/:id/form')

  const handleClick = () => {
    if (matchFormRoute) {
      setLocation(`/snippets/${params.id}`)
      return
    }

    setLocation(`/snippets/${params.id}/form`)
  }

  return (
    <Tooltip
      content={intl.formatMessage({id: 'editor.form'})}
    >
      <IconButton
        icon={FormIcon}
        height={majorScale(4)}
        borderRadius='50%'
        marginLeft={majorScale(1)}
        onClick={handleClick}
        isActive={matchFormRoute}
      />
    </Tooltip>
  )
}

export default FormButton
