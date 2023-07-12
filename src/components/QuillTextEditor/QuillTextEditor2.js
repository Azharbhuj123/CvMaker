import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector, useDispatch } from 'react-redux'
import { saveData } from '../../Redux/actions/CvGeneratorAction'
import { profileRichTextData } from '../../Redux/reducers/CvGeneratorReducer'

const QuillTextEditor2 = (props) => {
  const dispatch = useDispatch()
  const editorData = useSelector(profileRichTextData)

  const handleChange = (event) => {
    console.log(editorData, '<===== data')
    dispatch(saveData(event.target.value))
  }

  return (
    <textarea
      style={{
        width: '100%',
        height: '8rem',
        borderRadius: '5px',
        border: 'none',
        padding: '20px',
        resize: 'none',
        textAlign: 'start',
        backgroundColor: '#F6F3F1',
      }}
      {...props}
      theme='snow'
      value={editorData}
      onChange={handleChange}
    />
  )
}

export default QuillTextEditor2
