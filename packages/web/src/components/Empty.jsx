import {Heading, majorScale, Pane, Text} from 'evergreen-ui'

import {inspire} from '../utils/api'

const Empty = () => {
  const snippets = inspire().split('-')

  const sentence = snippets[0].trim()
  const author = snippets[1].trim()

  const emptyTextProperties = {
    color: 'transparent',
    backgroundColor: '#d0d0d0',
    textShadow: '1px 1px 0px rgba(255,255,255,0.5)',
    style: {
      WebkitBackgroundClip: 'text',
    },
  }

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
        {...emptyTextProperties}
      >
        {sentence}
      </Heading>

      <Text
        marginTop={majorScale(2)}
        fontStyle='italic'
        size={300}
        {...emptyTextProperties}
      >
        {author}
      </Text>
    </Pane>
  )
}

export default Empty
