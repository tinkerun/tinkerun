import {memo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import * as monaco from 'monaco-editor'

import EditorContainer from './EditorContainer'
import {registerPHPSnippetLanguage} from '../../utils/registerPHPSnippetLanguage'

const layoutEditor = editor => {
  const layout = () => editor.layout()
  window.addEventListener('resize', layout)
  layout()

  return {
    dispose: () => window.removeEventListener('resize', layout),
  }
}

const Editor = () => {
  const {code, setCode} = EditorContainer.useContainer()
  const editorRef = useRef()

  useEffect(() => {
    // 注册 php-snippet
    registerPHPSnippetLanguage(monaco.languages)

    const editor = monaco.editor.create(editorRef.current, {
      language: 'php-snippet',
      lineNumbers: 'on',
      value: code,
      selectOnLineNumbers: true,
    })

    editor.focus()
    const change = editor.onDidChangeModelContent((e) => {
      setCode(editor.getValue())
    })

    const layout = layoutEditor(editor)

    return () => {
      editor.dispose()

      const model = editor.getModel()
      if (model) {
        model.dispose()
      }

      change.dispose()
      layout.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Pane
      flex={1}
      ref={editorRef}
    />
  )
}

export default memo(Editor)
