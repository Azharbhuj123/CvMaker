import { PDFViewer, StyleSheet } from '@react-pdf/renderer'
import React from 'react'

function PdfRapper({ child }) {
  const styles = StyleSheet.create({
    document: {
      width: '100%',
      height: '100vh',
    },
  })
  return <PDFViewer showToolbar={false} style={styles.document}>{child}</PDFViewer>
}

export default PdfRapper
