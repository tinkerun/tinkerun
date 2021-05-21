import {Button, Code, CodeIcon, majorScale, Pane, Paragraph} from 'evergreen-ui'
import {useLocation, useRoute} from 'wouter'

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
        No fields, try to add some variables prefixed with <Code size={300}>$field_</Code> to the code.
      </Paragraph>

      <Button
        iconBefore={CodeIcon}
        height={majorScale(3)}
        onClick={() => setLocation(`/snippets/${params.id}`)}
      >
        Edit the code
      </Button>
    </Pane>
  )
}

export default NoFormFields
