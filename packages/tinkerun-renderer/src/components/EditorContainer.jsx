import PropTypes from 'prop-types'

import OutputTabContainer from './editor/OutputTabContainer'
import SizesContainer from './editor/SizesContainer'
import CodeContainer from './editor/CodeContainer'

const EditorContainer = ({children}) => (
  <CodeContainer.Provider>
    <OutputTabContainer.Provider>
      <SizesContainer.Provider>
        {children}
      </SizesContainer.Provider>
    </OutputTabContainer.Provider>
  </CodeContainer.Provider>
)

EditorContainer.propTypes = {
  children: PropTypes.any.isRequired,
}

export default EditorContainer
