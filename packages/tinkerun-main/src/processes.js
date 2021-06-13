/* eslint no-return-assign: "off" */
let indexWindow = null
const editorWindows = {}
const ptyProcesses = {}
const backgroundPtyProcesses = {}

const getIndexWindow = () => indexWindow
const setIndexWindow = win => indexWindow = win

const getEditorWindow = id => editorWindows[id]
const setEditorWindow = (id, win) => editorWindows[id] = win

const getPtyProcess = id => ptyProcesses[id]
const setPtyProcess = (id, process) => ptyProcesses[id] = process

const getBackgroundPtyProcess = id => backgroundPtyProcesses[id]
const setBackgroundPtyProcess = (id, process) => backgroundPtyProcesses[id] = process

module.exports = {
  getIndexWindow,
  setIndexWindow,
  getEditorWindow,
  setEditorWindow,
  getPtyProcess,
  setPtyProcess,
  getBackgroundPtyProcess,
  setBackgroundPtyProcess,
}
