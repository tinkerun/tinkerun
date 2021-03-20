import {Tablist, Tab} from 'evergreen-ui'
import {useIntl} from 'react-intl'
import {useAtom} from 'jotai'

import {tabIndexAtom} from '../../stores/editor'

const OutputTab = () => {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom)
  const intl = useIntl()

  const tabs = [
    intl.formatMessage({id: 'editor.terminal'}),
    intl.formatMessage({id: 'editor.output'}),
  ]

  return (
    <Tablist>
      {tabs.map((tab, index) => (
        <Tab
          key={`output_tabs_${index}`}
          id={tab}
          onSelect={() => setTabIndex(index)}
          isSelected={index === tabIndex}
        >
          {tab}
        </Tab>
      ))}
    </Tablist>
  )
}

export default OutputTab
