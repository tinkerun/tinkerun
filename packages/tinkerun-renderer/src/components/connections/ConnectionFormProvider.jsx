import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {FormProvider, useForm} from 'react-hook-form'

const ConnectionFormProvider = ({children, defaultValues}) => {
  const methods = useForm()
  const {reset} = methods

  // 解决表单不能根据默认值重新填充的问题
  // https://github.com/react-hook-form/react-hook-form/discussions/2282#discussioncomment-39308
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues.id])

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}

ConnectionFormProvider.propTypes = {
  defaultValues: PropTypes.object,
  children: PropTypes.any.isRequired,
}

ConnectionFormProvider.defaultProps = {
  defaultValues: {},
}

export default ConnectionFormProvider
