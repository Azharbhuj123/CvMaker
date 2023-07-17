import { PDFDownloadLink } from '@react-pdf/renderer'
import React from 'react'
import TemplateEight from '../components/generator/templateEight'
import axios from 'axios'

const TemplateEghtButton = () => {
  const sendPDFToBackend = async (blob) => {
    const formData = new FormData()
    formData.append('cv', blob)
    try {
      console.log('try')
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + 'user/mail',
        formData
      )
      console.log(response)
    } catch (error) {
      console.log(error, '<========= error')
    }
  }

  return (
    <>
    </>
  )
}

export default TemplateEghtButton
