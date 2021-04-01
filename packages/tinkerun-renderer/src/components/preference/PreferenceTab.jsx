import {CogIcon, majorScale, SidebarTab, Tablist} from 'evergreen-ui'
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
  ]

  return (
    <Tablist
      flexBasis={100}
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
            alignItems='center'
            display='flex'
          >
            <Component
              size={12}
              marginRight={majorScale(1)}
            />
            {text}
          </SidebarTab>
        )
      })}
    </Tablist>
  )
}

export default PreferenceTab
