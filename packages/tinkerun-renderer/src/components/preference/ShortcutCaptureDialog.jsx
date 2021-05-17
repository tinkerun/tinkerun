import PropTypes from 'prop-types'
import {Dialog} from 'evergreen-ui'

import ShortcutCaptureForm from './ShortcutCaptureForm'

const ShortcutCaptureDialog = ({defaultValue, onEnter, ...dialogProps}) => {
  return (
    <Dialog
      hasFooter={false}
      hasHeader={false}
      isShown={true}
      {...dialogProps}
    >
      {({close}) => (
        <ShortcutCaptureForm
          defaultValue={defaultValue}
          onEnter={onEnter}
          close={close}
        />
      )}
    </Dialog>
  )
}

ShortcutCaptureDialog.propTypes = {
  defaultValue: PropTypes.array.isRequired,
  onEnter: PropTypes.func.isRequired,
}

export default ShortcutCaptureDialog
