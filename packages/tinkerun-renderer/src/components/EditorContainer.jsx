import PropTypes from 'prop-types'

import OutputTabContainer from './editor/OutputTabContainer'
import SizesContainer from './editor/SizesContainer'
import CodeContainer from './editor/CodeContainer'
import OutputContainer from './editor/OutputContainer'

const EditorContainer = ({children}) => (
  <OutputContainer.Provider>
    <CodeContainer.Provider>
      <OutputTabContainer.Provider>
        <SizesContainer.Provider>
          {children}
        </SizesContainer.Provider>
      </OutputTabContainer.Provider>
    </CodeContainer.Provider>
  </OutputContainer.Provider>
)

EditorContainer.propTypes = {
  children: PropTypes.any.isRequired,
}

export default EditorContainer
