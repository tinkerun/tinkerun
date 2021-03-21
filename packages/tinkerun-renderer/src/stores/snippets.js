import {atom} from 'jotai'
import {atomWithImmer} from 'jotai/immer'

import {allSnippets, createSnippet, updateSnippet} from '../utils/api'

const snippetDataAtom = atomWithImmer(allSnippets())

const snippetListAtom = atom(get => Object.values(get(snippetDataAtom)))

const createSnippetAtom = atom(null, (get, set, snippet) => {
  set(snippetDataAtom, data => {
    data[snippet.id] = snippet
  })

  createSnippet(get(snippetDataAtom)[snippet.id])
})

const updateSnippetAtom = atom(null, (get, set, snippet) => {
  set(snippetDataAtom, data => {
    for (const key in snippet) {
      if (key !== 'id') {
        data[snippet.id][key] = snippet[key]
      }
    }
  })

  updateSnippet(get(snippetDataAtom)[snippet.id])
})

const snippetAtoms = {}

const snippetAtomWithId = id => {
  if (!snippetAtoms[id]) {
    snippetAtoms[id] = atom(get => get(snippetDataAtom)[id])
  }

  return snippetAtoms[id]
}

export {
  snippetDataAtom,
  snippetListAtom,
  createSnippetAtom,
  updateSnippetAtom,
  snippetAtomWithId,
}
