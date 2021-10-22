import {useCallback, useEffect, useState} from 'react'
import {Button, majorScale, Pane, PlayIcon} from 'evergreen-ui'
import {useRoute} from 'wouter'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import debounce from 'lodash/debounce'
import {FormattedMessage} from 'react-intl'

import FormField from './FormField'
import NoFormFields from './NoFormFields'
import {snippetAtomWithId} from '../../stores/snippets'
import {runAtom} from '../../stores/editor'
import {parsePhpForm, stringifyPhpForm} from '../../utils/api'

const Form = () => {
  const [, params] = useRoute('/snippets/:id/:mode')
  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const run = useUpdateAtom(runAtom)
  const [fields, setFields] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const result = await parsePhpForm(snippet.code)
        setFields(result)
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runDebounced = useCallback(debounce(code => run(code), 500), [])

  const runSnippet = async () => {
    const code = await stringifyPhpForm(fields)
    runDebounced(code)
  }

  const changeFieldValue = (index, value) => {
    setFields(fields.map((field, idx) => {
      if (idx === index) {
        return {
          ...field,
          value,
        }
      }
      return field
    }))
  }

  if (fields.length <= 0) {
    return <NoFormFields error={error}/>
  }

  return (
    <Pane
      paddingX={majorScale(2)}
      paddingY={majorScale(2)}
      overflow='auto'
      flex={1}
    >
      {fields.map((field, index) => (
        <FormField
          key={`fields_${index}`}
          field={field}
          onChange={value => changeFieldValue(index, value)}
        />
      ))}

      <Pane>
        <Button
          iconBefore={PlayIcon}
          height={majorScale(3)}
          onClick={runSnippet}
        >
          <FormattedMessage id='editor.run'/>
        </Button>
      </Pane>
    </Pane>
  )
}

export default Form
