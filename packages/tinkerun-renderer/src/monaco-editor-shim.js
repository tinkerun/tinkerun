import 'monaco-editor'
import 'monaco-editor/esm/vs/editor/editor.worker.js'

// eslint-disable-next-line no-undef
self.MonacoEnvironment = {
  getWorker: (workerId, label) => {
    // eslint-disable-next-line no-undef
    return new Worker(
      '_snowpack/pkg/monaco-editor/esm/vs/editor/editor.worker.js',
      {
        type: 'module',
      },
    )
  },
}
