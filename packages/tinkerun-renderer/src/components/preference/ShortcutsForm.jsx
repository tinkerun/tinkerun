import {majorScale, Pane} from 'evergreen-ui'

import ShortcutRunField from './ShortcutRunField'
import ShortcutNewConnectionField from './ShortcutNewConnectionField'

const ShortcutsForm = () => (
  <>
    <Pane>
      <ShortcutRunField/>
    </Pane>
    <Pane
      marginTop={majorScale(3)}
    >
      <ShortcutNewConnectionField/>
    </Pane>
  </>
)

export default ShortcutsForm
