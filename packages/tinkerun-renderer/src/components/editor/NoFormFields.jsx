import PropTypes from 'prop-types'
import {InlineAlert, Button, Code, CodeIcon, majorScale, Pane, Paragraph} from 'evergreen-ui'
import {useLocation, useRoute} from 'wouter'
import {FormattedMessage} from 'react-intl'
import {useAtomValue} from 'jotai/utils'

import {configAtom} from '../../stores/config'

const NoFormFields = ({error}) => {
  const config = useAtomValue(configAtom)
  const [, params] = useRoute('/snippets/:id/:mode')
  const [, setLocation] = useLocation()
  return (
    <Pane
      paddingX={majorScale(2)}
      paddingY={majorScale(2)}
    >
      {
        error
          ? (
            <InlineAlert
              intent="warning"
              marginBottom={majorScale(2)}
              whiteSpace='pre-line'
            >
              {error}
            </InlineAlert>
            )
          : (
            <Paragraph
              color="muted"
              marginBottom={majorScale(2)}
            >
              <FormattedMessage
                id="editor.form_no_fields"
                values={{
                  prefix: config.form_prefix,
                  // eslint-disable-next-line react/display-name
                  code: chucks => <Code size={300}>{chucks}</Code>,
                }}
              />
            </Paragraph>
            )
      }

      <Button
        iconBefore={CodeIcon}
        height={majorScale(3)}
        onClick={() => setLocation(`/snippets/${params.id}/editor`)}
      >
        <FormattedMessage id="editor.form_edit_code"/>
      </Button>
    </Pane>
  )
}

NoFormFields.propTypes = {
  error: PropTypes.string,
}

NoFormFields.defaultProps = {
  error: '',
}

export default NoFormFields
