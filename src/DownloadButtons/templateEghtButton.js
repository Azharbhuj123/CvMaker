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
      <PDFDownloadLink document={document.getElementsByClassName("docs")} fileName='somename.pdf'>
        {({ blob, url, loading, error }) =>
          loading ? (
            'Loading document...'
          ) : (
            <button
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '180px',
                borderRadius: '5px',
                gap: '5px',
                background: '#F6F3F1',
                padding: '10px',
                fontFamily: 'Montserrat',
                fontWeight: '600',
                fontSize: '16px',
                border: '1px solid #F6F3F1',
                backgroundColor: '#eeb856',
                margin: '10px',
              }}
              onClick={() => sendPDFToBackend(blob)}
            >
              Last ned CV
            </button>
          )
        }
      </PDFDownloadLink>
    </>
  )
}

export default TemplateEghtButton
