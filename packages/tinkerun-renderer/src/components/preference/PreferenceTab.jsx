import {CogIcon, KeyCommandIcon, majorScale, Pane, SidebarTab, Tablist} from 'evergreen-ui'
import {useAtomValue, useUpdateAtom} from 'jotai/utils'

import {preferenceTabIndexAtom} from '../../stores/preference'

const PreferenceTab = () => {
  const tabIndex = useAtomValue(preferenceTabIndexAtom)
  const setTabIndex = useUpdateAtom(preferenceTabIndexAtom)

  const tabs = [
    {
      icon: CogIcon,
      text: 'General',
    },
    {
      icon: KeyCommandIcon,
      text: 'Shortcuts',
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
