import {memo} from 'react'
import {Pane} from 'evergreen-ui'
import MonacoEditor from 'react-monaco-editor'

import EditorContainer from './EditorContainer'
import {registerPHPSnippetLanguage} from '../../utils/registerPHPSnippetLanguage'

const Editor = () => {
  const {code, setCode} = EditorContainer.useContainer()

  const handleEditorDidMount = editor => {
    editor.focus()
  }

  const handleChange = value => {
    setCode(value)
  }

  const handleEditorWillMount = monaco => {
    // register php-snippet language
    registerPHPSnippetLanguage(monaco.languages)
  }

  return (
    <Pane
      flex={1}
    >
      <MonacoEditor
        height={350}
        language='php-snippet'
        value={code}
        options={{
          selectOnLineNumbers: true,
        }}
        onChange={handleChange}
        editorDidMount={handleEditorDidMount}
        editorWillMount={handleEditorWillMount}
      />
    </Pane>
  )
}

export default memo(Editor)
