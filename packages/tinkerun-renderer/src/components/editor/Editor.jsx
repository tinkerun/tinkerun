import {memo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import * as monaco from 'monaco-editor'

import EditorContainer from './CodeContainer'
import {registerPHPSnippetLanguage} from '../../utils/registerPHPSnippetLanguage'
import useEditorLayout from '../../hooks/useEditorLayout'

const Editor = () => {
  const {code, setCode} = EditorContainer.useContainer()
  const domRef = useRef()
  const editorRef = useRef()

  useEditorLayout(editorRef)

  useEffect(() => {
    // 注册 php-snippet
    registerPHPSnippetLanguage(monaco.languages)

    const editor = monaco.editor.create(domRef.current, {
      language: 'php-snippet',
      lineNumbers: 'on',
      value: code,
      selectOnLineNumbers: true,
    })

    editor.focus()

    const change = editor.onDidChangeModelContent((e) => {
      setCode(editor.getValue())
    })

    editorRef.current = editor

    return () => {
      editor.dispose()

      const model = editor.getModel()
      if (model) {
        model.dispose()
      }

      change.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Pane
      height='100%'
      ref={domRef}
    />
  )
}

export default memo(Editor)
