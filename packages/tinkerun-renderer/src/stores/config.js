import {atom} from 'jotai'
import {atomWithImmer} from 'jotai/immer'

import {allConfig, setConfig} from '../utils/api'

const configAtom = atomWithImmer(allConfig())

const setConfigAtom = atom(null, (get, set, update) => {
  set(configAtom, config => {
    for (const k in update) {
      config[k] = update[k]
    }
  })

  setConfig(update)
})

export {
  configAtom,
  setConfigAtom,
}
