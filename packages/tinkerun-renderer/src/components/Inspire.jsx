import {Heading, majorScale, Pane, Text} from 'evergreen-ui'

import {inspire} from '../utils/api'

const Inspire = () => {
  const snippets = inspire().split('-')

  const sentence = snippets[0].trim()
  const author = snippets[1].trim()

  return (
    <Pane
      display='flex'
      flexDirection='column'
      height='100vh'
      width='100%'
      justifyContent='center'
      padding={majorScale(2)}
    >
      <Heading
        size={600}
        color='darkgray'
        fontWeight='lighter'
      >
        {sentence}
      </Heading>

      <Text
        marginTop={majorScale(2)}
        fontStyle='italic'
        size={300}
        color='darkgray'
        fontWeight='lighter'
      >
        {author}
      </Text>
    </Pane>
  )
}

export default Inspire
