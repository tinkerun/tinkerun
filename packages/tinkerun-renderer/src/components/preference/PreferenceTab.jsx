import {CogIcon, KeyCommandIcon, majorScale, Pane, SidebarTab, Tablist} from 'evergreen-ui'
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
    >
      {tabs.map(({icon, text}, index) => {
        const Component = icon
        return (
          <SidebarTab
            key={`setting_tabs_${index}`}
            isSelected={tabIndex === index}
            onSelect={() => setTabIndex(index)}
          >
            <Pane
              alignItems='center'
              display='flex'
            >
              <Component
                size={12}
                marginRight={majorScale(1)}
              />
              {text}
            </Pane>
          </SidebarTab>
        )
      })}
    </Tablist>
  )
}

export default PreferenceTab
