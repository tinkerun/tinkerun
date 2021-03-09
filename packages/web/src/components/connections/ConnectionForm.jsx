import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Pane} from 'evergreen-ui'
import {useForm, FormProvider} from 'react-hook-form'

import Field from '../Field'
import ConnectButton from './ConnectButton'
import OverSSHButton from './OverSSHButton'
import AutoSave from './AutoSave'
import SSHForm from './SSHForm'
import BasicForm from './BasicForm'

const ConnectionForm = ({defaultValues}) => {
  const methods = useForm()
  const {reset} = methods

  // 解决表单不能根据默认值重新填充的问题
  // https://github.com/react-hook-form/react-hook-form/discussions/2282#discussioncomment-39308
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues.id])

  return (
    <FormProvider {...methods}>
      <AutoSave/>
      <BasicForm/>
      <SSHForm/>

      <Pane
        display='flex'
        justifyContent='space-between'
      >
        <Field
          marginBottom={0}
        >
          <OverSSHButton/>
        </Field>

        <ConnectButton/>

      </Pane>
    </FormProvider>
  )
}

ConnectionForm.propTypes = {
  defaultValues: PropTypes.object,
}

ConnectionForm.defaultProps = {
  defaultValues: {},
}

export default ConnectionForm
