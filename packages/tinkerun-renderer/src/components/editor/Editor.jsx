import {memo, useEffect, useRef} from 'react'
import {Pane} from 'evergreen-ui'
import * as monaco from 'monaco-editor'
import {useIntl} from 'react-intl'

import EditorContainer from './CodeContainer'
import {registerPHPSnippetLanguage} from '../../utils/registerPHPSnippetLanguage'
import useEditorLayout from '../../hooks/useEditorLayout'

const Editor = () => {
  const {code, setCode, runCode} = EditorContainer.useContainer()
  const domRef = useRef()
  const editorRef = useRef()
  const intl = useIntl()

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

    editor.addAction({
      id: 'run-php-snippet',
      label: intl.formatMessage({id: 'editor.run'}),
      keybindings: [
        monaco.KeyMod.WinCtrl | monaco.KeyCode.KEY_R,
      ],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: ed => {
        runCode(ed.getValue())
        return null
      },
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
