import {Button, Code, CodeIcon, majorScale, Pane, Paragraph} from 'evergreen-ui'
import {useLocation, useRoute} from 'wouter'
import {FormattedMessage} from 'react-intl'

const NoFormFields = () => {
  const [, params] = useRoute('/snippets/:id/:form?')
  const [, setLocation] = useLocation()
  return (
    <Pane
      paddingX={majorScale(2)}
      paddingY={majorScale(2)}
    >
      <Paragraph
        color="muted"
        marginBottom={majorScale(2)}
      >
        <FormattedMessage
          id='editor.form_no_fields'
          values={{
            prefix: '$field_',
            // eslint-disable-next-line react/display-name
            code: chucks => <Code size={300}>{chucks}</Code>,
          }}
        />
      </Paragraph>

      <Button
        iconBefore={CodeIcon}
        height={majorScale(3)}
        onClick={() => setLocation(`/snippets/${params.id}`)}
      >
        <FormattedMessage id='editor.form_edit_code'/>
      </Button>
    </Pane>
  )
}

export default NoFormFields
