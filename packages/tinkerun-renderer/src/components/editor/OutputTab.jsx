import {Tablist, Tab} from 'evergreen-ui'
import {useIntl} from 'react-intl'

import OutputContainer from './OutputContainer'

const OutputTab = () => {
  const {tabIndex, setTabIndex} = OutputContainer.useContainer()
  const intl = useIntl()

  const tabs = [
    intl.formatMessage({id: 'editor.output'}),
    intl.formatMessage({id: 'editor.terminal'}),
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
