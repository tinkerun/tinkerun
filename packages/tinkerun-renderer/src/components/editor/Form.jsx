import {useCallback, useEffect, useState} from 'react'
import {Button, majorScale, Pane, PlayIcon} from 'evergreen-ui'
import {useRoute} from 'wouter'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import {instance} from 'php-form'
import debounce from 'lodash/debounce'
import {FormattedMessage} from 'react-intl'

import FormField from './FormField'
import NoFormFields from './NoFormFields'
import {snippetAtomWithId} from '../../stores/snippets'
import {runAtom} from '../../stores/editor'

const Form = () => {
  const [, params] = useRoute('/snippets/:id/:form?')
  const snippet = useAtomValue(snippetAtomWithId(params.id))
  const run = useUpdateAtom(runAtom)
  const [fields, setFields] = useState([])
  const [phpForm, setPHPForm] = useState(null)

  useEffect(() => {
    (async () => {
      const phpFormInstance = await instance('field_')
      const result = await phpFormInstance.parse(snippet.code)
      setPHPForm(phpFormInstance)
      setFields(result)
    })()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runDebounced = useCallback(debounce(code => run(code), 500), [])

  const runSnippet = async () => {
    const code = await phpForm.stringify(fields)
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
    return <NoFormFields/>
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
          <FormattedMessage id='editor.form_run_snippet'/>
        </Button>
      </Pane>
    </Pane>
  )
}

export default Form
