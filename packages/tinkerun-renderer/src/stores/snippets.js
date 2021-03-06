import {atom} from 'jotai'
import {atomWithImmer} from 'jotai/immer'
import {nanoid} from 'nanoid'
import isEmpty from 'lodash/isEmpty'

import {allSnippets, createSnippet, deleteSnippet, updateSnippet} from '../utils/api'

const newSnippet = snippet => ({
  id: nanoid(),
  code: '',
  name: 'New Snippet',
  ...snippet,
})

const allSnippetData = () => {
  const data = allSnippets()

  if (isEmpty(data)) {
    const snippet = newSnippet()
    data[snippet.id] = snippet
  }

  return data
}

const snippetDataAtom = atomWithImmer(allSnippetData())

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

const deleteSnippetAtom = atom(null, (get, set, id) => {
  set(snippetDataAtom, data => {
    delete data[id]
  })

  deleteSnippet(id)
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
  deleteSnippetAtom,
  snippetAtomWithId,
  newSnippet,
}
