import {CogIcon, KeyCommandIcon, majorScale, Pane, Tab, Tablist} from 'evergreen-ui'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'
import {useIntl} from 'react-intl'

import {preferenceTabIndexAtom} from '../../stores/preference'

const PreferenceTab = () => {
  const intl = useIntl()
  const tabIndex = useAtomValue(preferenceTabIndexAtom)
  const setTabIndex = useUpdateAtom(preferenceTabIndexAtom)

  const tabs = [
    {
      icon: CogIcon,
      text: intl.formatMessage({id: 'preference.general'}),
    },
    {
      icon: KeyCommandIcon,
      text: intl.formatMessage({id: 'preference.shortcuts'}),
    },
  ]

  return (
    <Tablist
      flexBasis={200}
      paddingX={majorScale(1)}
      paddingY={majorScale(2)}
      display='flex'
      flexDirection='column'
    >
      {tabs.map(({icon, text}, index) => {
        const Component = icon
        return (
          <Tab
            key={`setting_tabs_${index}`}
            isSelected={tabIndex === index}
            onSelect={() => setTabIndex(index)}
            marginBottom={majorScale(1)}
          >
            <Pane
              alignItems='center'
              display='flex'
              justifyContent='start'
              width='100%'
            >
              <Component
                size={12}
                marginRight={majorScale(1)}
              />
              {text}
            </Pane>
          </Tab>
        )
      })}
    </Tablist>
  )
}

export default PreferenceTab
