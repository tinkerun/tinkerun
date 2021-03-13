import {CogIcon, IconButton, majorScale} from 'evergreen-ui'

const SettingButton = () => {
  return (
    <IconButton
      icon={CogIcon}
      height={majorScale(3)}
      appearance='minimal'
    />
  )
}

export default SettingButton
