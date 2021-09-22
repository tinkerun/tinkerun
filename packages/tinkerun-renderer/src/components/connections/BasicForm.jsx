import {majorScale, TextInput} from 'evergreen-ui'
import {useFormContext} from 'react-hook-form'
import {useIntl} from 'react-intl'

import Field from '../Field'
import TagSelector from './TagSelector'
import PathField from './PathField'

const BasicForm = () => {
  const intl = useIntl()

  const {register} = useFormContext()

  return (
    <>
      <TextInput
        name='id'
        type='hidden'
        {...register('id')}
      />

      <Field
        label={intl.formatMessage({id: 'connections.name'})}
      >
        <TextInput
          width='100%'
          height={majorScale(3)}
          placeholder='Magic'
          name='name'
          {...register('name')}
        />
      </Field>

      <Field
        label={intl.formatMessage({id: 'connections.tag'})}
      >
        <TagSelector/>
      </Field>

      <PathField/>

      <Field label={intl.formatMessage({id: 'connections.command'})}>
        <TextInput
          width='100%'
          height={majorScale(3)}
          placeholder='php artisan tinker'
          name='command'
          {...register('command')}
        />
      </Field>
    </>
  )
}

export default BasicForm
