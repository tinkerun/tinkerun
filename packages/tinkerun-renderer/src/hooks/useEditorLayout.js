import {useEffect} from 'react'

import SizesContainer from '../components/editor/SizesContainer'

const useEditorLayout = (editorRef) => {
  const {sizes} = SizesContainer.useContainer()

  useEffect(() => {
    const layout = () => editorRef.current.layout()
    window.addEventListener('resize', layout)

    return () => window.removeEventListener('resize', layout)
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout()
    }
  }, [sizes, editorRef])
}

export default useEditorLayout
