import {useLocation, useRoute} from 'wouter'
import {IconButton, FormIcon, majorScale} from 'evergreen-ui'
import {useIntl} from 'react-intl'

import Tooltip from '../Tooltip'

const FormButton = () => {
  const intl = useIntl()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/snippets/:id/:mode')
  const isFormMode = params.mode === 'form'

  const handleClick = () => {
    if (isFormMode) {
      setLocation(`/snippets/${params.id}/editor`)
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
        isActive={isFormMode}
      />
    </Tooltip>
  )
}

export default FormButton
