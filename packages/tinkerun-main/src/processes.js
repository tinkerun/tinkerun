/* eslint no-return-assign: "off" */
let indexWindow = null
const editorWindows = {}
const ptyProcesses = {}

const getIndexWindow = () => indexWindow
const setIndexWindow = win => indexWindow = win

const getEditorWindow = id => editorWindows[id]
const setEditorWindow = (id, win) => editorWindows[id] = win

const getPtyProcess = id => ptyProcesses[id]
const setPtyProcess = (id, process) => ptyProcesses[id] = process

module.exports = {
  getIndexWindow,
  setIndexWindow,
  getEditorWindow,
  setEditorWindow,
  getPtyProcess,
  setPtyProcess,
}
