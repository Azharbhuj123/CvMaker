import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector, useDispatch } from 'react-redux'
import { saveData } from '../../Redux/actions/CvGeneratorAction'
import { profileRichTextData } from '../../Redux/reducers/CvGeneratorReducer'

const QuillTextEditor2 = (props) => {
  const dispatch = useDispatch()
  const editorData = useSelector(profileRichTextData)
  const [value, setValue] = useState('')

  const onChange = (value) => {
    console.log(editorData, '<===== data')
    dispatch(saveData(value))
  }

  // const onChange = (value) => {
  //   dispatch(saveData({ value }));
  // };
    
  return (
    <ReactQuill
      {...props}
      theme='snow'
      value={editorData}
      onChange={onChange}
    />
  //   <ReactQuill
  //   value={editorData}
  //   onChange={(e) => onChange("profile data", e)}
  // />
  )
}

export default QuillTextEditor2
