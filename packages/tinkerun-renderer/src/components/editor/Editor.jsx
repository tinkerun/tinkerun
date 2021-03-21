import {useMemo, useEffect, useRef, useCallback} from 'react'
import {Pane} from 'evergreen-ui'
import * as monaco from 'monaco-editor'
import {useIntl} from 'react-intl'
import {useRoute} from 'wouter'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import debounce from 'lodash/debounce'

import {registerPHPSnippetLanguage} from '../../utils/registerPHPSnippetLanguage'
import {snippetAtomWithId, updateSnippetAtom} from '../../stores/snippets'
import {runAtom, sizesAtom} from '../../stores/editor'

const Editor = () => {
  const domRef = useRef()
  const editorRef = useRef()
  const editorEventsRef = useRef()
  const intl = useIntl()

  const [, params] = useRoute('/snippets/:id')
  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const updateSnippet = useUpdateAtom(updateSnippetAtom)
  const sizes = useAtomValue(sizesAtom)
  const run = useUpdateAtom(runAtom)

  const updateSnippetDebounced = useCallback(debounce(updateSnippet, 200), [])

  // 重置编辑器的事件和代码
  const resetEditor = editor => {
    const {id, code, position} = snippet
    // 设置代码
    editor.setValue(code)
    if (position) {
      // 设置光标位置
      editor.setPosition(position)
    }

    editor.focus()

    // 光标与代码修改的时候触发 handleChange
    const handleChange = () => {
      updateSnippetDebounced({
        id,
        code: editor.getValue(),
        position: editor.getPosition(),
      })
    }

    const onPositionChange = editor.onDidChangeCursorPosition(handleChange)
    const onCodeChange = editor.onDidChangeModelContent(handleChange)

    return [
      onPositionChange,
      onCodeChange,
    ]
  }

  // 当 resize 事件触发的时候，编辑器触发 layout
  useEffect(() => {
    const layout = () => editorRef.current.layout()
    window.addEventListener('resize', layout)
    return () => window.removeEventListener('resize', layout)
  }, [])

  // 编辑器和命令行的高度发生改变触发 layout
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout()
    }
  }, [sizes])

  // 更新代码
  useEffect(() => {
    const editor = editorRef.current
    let events = null

    // 解绑初始化的事件
    if (editorEventsRef.current) {
      for (const event of editorEventsRef.current) {
        event.dispose()
      }
    }

    if (editor) {
      events = resetEditor(editor)
    }

    return () => {
      if (events) {
        for (const event of events) {
          event.dispose()
        }
      }
    }
  }, [snippet.id])

  useEffect(() => {
    // 注册 php-snippet
    registerPHPSnippetLanguage(monaco.languages)

    const editor = monaco.editor.create(domRef.current, {
      language: 'php-snippet',
      lineNumbers: 'on',
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
        run(ed.getValue())
        return null
      },
    })

    // 初始化 editor 代码、光标、事件
    editorEventsRef.current = resetEditor(editor)

    // 第一次编辑器加载完成触发 layout
    editor.layout()

    editorRef.current = editor

    return () => {
      editor.dispose()

      const model = editor.getModel()
      if (model) {
        model.dispose()
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return useMemo(() => (
    <Pane
      flex={1}
      ref={domRef}
    />
  ), [])
}

export default Editor
