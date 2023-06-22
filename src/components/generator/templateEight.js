import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  languageData,
  profileRichTextData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  referenceData,
  propertiesData,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import { useSelector } from 'react-redux'
import ProgressBar from './progressBar'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'
import robotoBold from '../../assests/fonts/roboto/Roboto-Bold.ttf'
import robotoItalic from '../../assests/fonts/roboto/Roboto-Italic.ttf'
import robotoRegular from '../../assests/fonts/roboto/Roboto-Regular.ttf'
import robotoBoldItalic from '../../assests/fonts/roboto/Roboto-BoldItalic.ttf'
import {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
} from '@react-pdf/renderer'
import { Html } from 'react-pdf-html'

const TemplateEight = (props) => {
  useEffect(() => {
    let data = document.getElementsByClassName('template-eight-container')
    console.log(typeof data.namedItem, 'uiuiuiui')
  }, [])

  let pdfComponent = useRef()
  let printButtonRef = useRef()
  let docRef = useRef()
  const [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const hobbies = useSelector(getHobbies)
  const [data, setData] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [changeOccured, setChangeOccured] = useState(true)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const profileData = useSelector(profileRichTextData)
  const skillData = useSelector(propertiesData)
  const refrence = useSelector(referenceData)
  const courses = useSelector(coursesData)
  const lanuages = useSelector(languageData)
  const toggleData = useSelector(getRefToggle)
  const [clicked, setIsClicked] = useState(false)
  const { ProfilText } = props
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('template-eight-container'),
      cvData.email,
      displayTemplate
    )
  }

  useEffect(() => {
    console.log('re render!!!', docRef.current)
  }, [changeOccured])

  useEffect(() => {
    if (displayTemplate == true && displayTemplate !== {}) {
      console.log(
        'mobile screen detected the element will directly be printed now !!!!!!!!!!!'
      )
      printButtonRef.current.click()
    }
  }, [displayTemplate])

  Font.register({
    family: 'Roboto',
    fonts: [
      { src: robotoRegular },
      { src: robotoBold, fontWeight: 'bold' },
      { src: robotoItalic, fontStyle: 'italic' },
      { src: robotoBoldItalic, fontStyle: 'italic', fontWeight: 'bold' },
    ],
  })

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    document: {
      width: '100%',
      height: '100vh',
    },
    documentViewer:{
      width: '100%',
      height: '100vh',
      // position: 'absolute',
      // zIndex: '9',
    },
    // templateEight: {
    //   display: 'flex',
    //   gap: 32,
    //   width: '100%',
    // },
    pageLeftSection: {
      backgroundColor: 'rgb(238, 234, 228)',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      width: '30%',
    },
    mainTitleSection: {
      alignItems: 'center',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      position: 'absolute',
      width: '70%',
      top: 30,
      left: '15%',
      border: ' 3px solid #b19c7d',
      color: '#b19c7d',
    },
    mainTitle: {
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontSize: 40,
      fontWeight: 700,
      textAlign: 'center',
    },
    mainSubTitle: {
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontSize: 12,
      fontWeight: 200,
      textAlign: 'center',
    },
    detailSection: {
      marginTop: 150,
      borderBottom: '3px solid #b19c7d',
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontWeight: 700,
      fontSize: 16,
      paddingBottom: 8,
      textAlign: 'left',
      textTransform: 'uppercase',
      width: '80%',
    },
    detailSectionContent: {
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      wordBreak: 'break-all',
    },
    detailSectionContentAdress: {
      fontSize: 13,
      fontFamily: 'Roboto',
      fontWeight: 600,
      marginTop: 15,
      textTransform: 'uppercase',
    },
    detailSectionContentAddressText: {
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 200,
      // marginTop: 5,
      textAlign: 'left',
      width: '80%',
      wordBreak: 'break-all',
    },
    skillSection: {
      marginTop: 16,
      borderBottom: '3px solid #b19c7d',
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 700,
      paddingBottom: 8,
      textAlign: 'left',
      textTransform: 'uppercase',
      width: '80%',
    },
    skillSectionContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    skillSectionContentText: {
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 200,
      textAlign: 'left',
      width: ' 80%',
      marginTop: 5,
    },
    documentHide: {
      display: 'none',
    },
    skillSectionContentLine: {
      width: '95%',
      height: 3,
      marginBottom: 15,
      marginTop: 8,
    },
    skillSectionContentLines: {
      width: '100%',
      borderTopWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: 'rgb(177, 156, 105)',
      borderStyle: 'dashed',
    },
    othersSection: {
      borderBottom: '3px solid #b19c7d',
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 700,
      paddingBottom: 8,
      textAlign: 'left',
      textTransform: 'uppercase',
      width: '80%',
    },
    languageSection: {
      fontSize: 13,
      fontFamily: 'Roboto',
      fontWeight: 700,
      marginTop: 5,
      textTransform: 'uppercase',
    },
    languageSectionText: {
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 200,
      display: 'flex',
      wordBreak: 'break-all',
    },
    hobbySection: {
      fontSize: 13,
      fontFamily: 'Roboto',
      fontWeight: 700,
      textTransform: 'uppercase',
      marginTop: 15,
    },
    pageRightSection: {
      marginLeft: 32,
      width: '70%',
    },
    profileSection: {
      borderBottom: '3px solid #b19c7d',
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 700,
      textAlign: 'left',
      marginTop: 150,
      paddingBottom: 8,
    },
    profileSectionText: {
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 200,
      marginTop: 15,
      wordBreak: 'break-word',
    },
    experienceSection: {
      borderBottom: '3px solid #b19c7d',
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 700,
      textAlign: 'left',
      paddingBottom: 8,
      marginTop: 15,
    },
    experienceSectionContent: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Roboto',
      marginTop: 15,
    },
    experienceSectionContentText: {
      color: '#000',
      fontFamily: 'Roboto',
      fontWeight: 600,
      fontSize: 10,
      wordBreak: 'break-word',
    },
    experienceSectionContentDate: {
      display: 'flex',
    },
    experienceSectionContentDateText: {
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 200,
      wordBreak: 'break-word',
      marginTop: 5,
    },
    experienceSectionContentPara: {},
    experienceSectionContentParaText: {
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 200,
      wordBreak: 'break-word',
      marginTop: 5,
    },
  })

  const DataToRender = () => (
    <Document style={clicked ? styles.document : styles.documentHide}>
      <Page size='A4' style={styles.page}>
        {/* <View>
        {' '}
        style={styles.templateEight} */}
        <View style={styles.pageLeftSection}>
          <Text style={styles.detailSection}>DETALJER</Text>
          <View style={styles.detailSectionContent}>
            {cvData.physicalAddress !== '' ? (
              <Text style={styles.detailSectionContentAdress}>ADRESSE</Text>
            ) : null}
            {cvData.physicalAddress !== '' ? (
              <Text
                style={styles.detailSectionContentAddressText}
                styles={{ wordBreak: 'break-word' }}
              >
                {cvData?.physicalAddress}
              </Text>
            ) : null}

            {cvData.country !== '' ? (
              <Text style={styles.detailSectionContentAdress}>By</Text>
            ) : null}
            {cvData.country !== '' ? (
              <Text style={styles.detailSectionContentAddressText}>
                {cvData?.country}
              </Text>
            ) : null}

            {cvData?.zipCode !== '' ? (
              <Text style={styles.detailSectionContentAdress}>POST KODE</Text>
            ) : null}
            {cvData?.zipCode !== '' ? (
              <Text style={styles.detailSectionContentAddressText}>
                {cvData?.zipCode}
              </Text>
            ) : null}

            {cvData?.drivingLicense ? (
              <Text style={styles.detailSectionContentAdress}>FØRERKORT</Text>
            ) : null}
            {cvData?.drivingLicense ? (
              <Text style={styles.detailSectionContentAddressText}>
                {cvData?.drivingLicense}
              </Text>
            ) : null}

            <Text style={styles.detailSectionContentAdress}>E-Post</Text>
            <Text style={styles.detailSectionContentAddressText}>
              {cvData?.email}
            </Text>

            <Text style={styles.detailSectionContentAdress}>TELEFON</Text>
            <Text style={styles.detailSectionContentAddressText}>
              {cvData?.phone}
            </Text>

            {cvData?.DOB == '' ? null : (
              <>
                <Text style={styles.detailSectionContentAdress}>
                  FØDSELSDATO
                </Text>
                <Text style={styles.detailSectionContentAddressText}>
                  {moment(cvData?.DOB).format('DD,MM,YYYY')}
                </Text>
              </>
            )}
          </View>

          <View style={styles.detailSectionContent}>
            <Text style={styles.skillSection}>FERDIGHETER</Text>
            <View style={styles.skillSectionContent}>
              {skillData?.map((item, index) => {
                return (
                  <>
                    {cvData.displayProgressBar === true ? (
                      <>
                        <ProgressBar
                          // fontFamily={"Roboto-Bold"}
                          keys={index}
                          title={item?.name}
                          percentage={item?.value}
                          backgroundcolor='#B19C7D'
                          height='3px'
                          dashed='dotted'
                          color='white'
                        />
                      </>
                    ) : (
                      <Text style={styles.skillSectionContentText} key={index}>
                        {item?.name}
                      </Text>
                    )}
                  </>
                )
              })}
            </View>
          </View>

          <View style={styles.detailSectionContent}>
            <Text style={styles.othersSection}>ANNET</Text>
            <Text style={styles.languageSection}> SPRÅK </Text>
            {lanuages?.map((item, index) => (
              <Text style={styles.languageSectionText} key={index}>
                {item?.name} {item?.value}
              </Text>
            ))}

            {accordiansEnabled.Hobbyer === true ? (
              <>
                <Text style={styles.hobbySection}> HOBBY</Text>
                <View style={{ display: 'flex' }}>
                  {hobbies?.map((item, index) => (
                    <Text style={styles.languageSectionText} key={index}>
                      {index === hobbies.length - 1
                        ? item?.name + '.'
                        : item?.name + ', '}
                    </Text>
                  ))}
                </View>
              </>
            ) : null}

            {accordiansEnabled.Kurs === true ? (
              <>
                <Text style={styles.hobbySection}> KURS</Text>
                <View style={{ display: 'flex' }}>
                  {courses?.map((item, index) => (
                    <Text style={styles.languageSectionText} key={index}>
                      {index === courses.length - 1
                        ? item?.name + '.'
                        : item?.name + ', '}
                    </Text>
                  ))}
                </View>
              </>
            ) : null}
          </View>
        </View>
        <View style={styles.mainTitleSection}>
          <Text style={styles.mainTitle}>
            {cvData?.firstName + ' ' + cvData?.lastName}
          </Text>
          <Text style={styles.mainSubTitle}>{cvData.jobTitle}</Text>
        </View>

        <View style={styles.pageRightSection} styles={{ width: '70%' }}>
          {profileData !== '<p><br></p>' && profileData !== '<p></p>' && (
            <>
              {console.log('profileData', profileData)}
              <Text style={styles.profileSection}>PROFIL</Text>
              <View>
                <Text
                  style={styles.profileSectionText}
                  // dangerouslySetInnerHTML={{
                  //   __html: profileData,
                  // }}
                >
                  {profileData.replace(/(<([^>]+)>)/gi, '')}
                </Text>
              </View>
            </>
          )}

          <Text style={styles.experienceSection}>ARBEIDSERFARING</Text>
          <View style={styles.experienceSectionContent}>
            {experianceData?.map((item, index) => (
              <>
                <Text style={styles.experienceSectionContentText} key={index}>
                  {item?.jobTitle + ' - ' + item?.employer}{' '}
                </Text>
                <View style={styles.experienceSectionContentDate}>
                  <Text style={styles.experienceSectionContentDateText}>
                    {item.startDate?.length === 0
                      ? 'Startdato -'
                      : moment(item?.startDate).format('YYYY-MM') + ' - '}
                    {item.toggle
                      ? 'dags dato'
                      : item.endDate.length === 0
                      ? ' Sluttdato'
                      : moment(item?.endDate).format('YYYY-MM')}
                  </Text>
                </View>
                <View style={styles.experienceSectionContentPara}>
                  <Text style={styles.experienceSectionContentParaText}>
                    {item.additionalInformation.replace(/(<([^>]+)>)/gi, '')}
                  </Text>
                </View>
              </>
            ))}
          </View>

          <Text style={styles.experienceSection}>UTDANNING </Text>
          {educationData?.map((item, index) => {
            return (
              <View style={styles.experienceSectionContent}>
                {item?.study ? (
                  <Text
                    style={styles.experienceSectionContentText}
                    keys={index}
                  >
                    {' '}
                    {item?.study + ', ' + item?.school}{' '}
                  </Text>
                ) : null}
                <View style={styles.experienceSectionContentDate}>
                  <Text style={styles.experienceSectionContentDateText}>
                    {item.startDate?.length === 0
                      ? 'Startdato -'
                      : moment(item?.startDate).format('YYYY-MM') + ' - '}
                    {item.toggle
                      ? 'dags dato'
                      : item.endDate.length === 0
                      ? ' Sluttdato'
                      : moment(item?.endDate).format('YYYY-MM')}
                  </Text>
                </View>
                <View style={styles.experienceSectionContentPara}>
                  <Text style={styles.experienceSectionContentParaText}>
                    {item.additionalInformation.replace(/(<([^>]+)>)/gi, '')}
                  </Text>
                </View>
              </View>
            )
          })}

          {accordiansEnabled.Praksisplasser === true ? (
            <>
              <Text style={styles.experienceSection}>PRAKSISPLASSER</Text>
              {internships?.map((item, index) => (
                <View style={styles.experienceSectionContent} keys={index}>
                  <Text style={styles.experienceSectionContentText}>
                    {item?.jobTitle + ' - ' + item?.employer}
                  </Text>
                  <View style={styles.experienceSectionContentDate}>
                    <Text style={styles.experienceSectionContentDateText}>
                      {item.startDate.length === 0
                        ? 'Startdato -'
                        : moment(item?.startDate).format('YYYY-MM') + ' - '}
                      {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? 'Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </Text>
                  </View>
                  <View style={styles.experienceSectionContentPara}>
                    <Text style={styles.experienceSectionContentParaText}>
                      {item.additionalInformation.replace(/(<([^>]+)>)/gi, '')}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          ) : null}

          {accordiansEnabled.Referanser === true ? (
            <>
              <Text style={styles.experienceSection}>REFERANSER</Text>
              {refrence?.map((item, index) => (
                <View style={styles.experienceSectionContent} key={index}>
                  {toggleData ? (
                    <Text style={styles.experienceSectionContentText}>
                      Oppgis ved forespørsel{' '}
                    </Text>
                  ) : (
                    <>
                      <Text style={styles.experienceSectionContentParaText}>
                        {item?.name}
                      </Text>
                      <Text style={styles.experienceSectionContentParaText}>
                        {item?.companyName}
                      </Text>
                      <Text style={styles.experienceSectionContentParaText}>
                        {item?.email}
                      </Text>
                    </>
                  )}
                </View>
              ))}
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )

  return (
    <>
      <DataToRender />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '90%',
        }}
      >
        <EndreMaalButton />
        <div className='gdpr-image'>
          {/* <input
                type="checkbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              /> */}
          <span>
            Ved å trykke på "laste ned", vil du laste ned CVen du har laget
            forplikte deg til å akseptere våre{' '}
            <Link to='/gdpr'>
              <span>vilkår og betingelser</span>
            </Link>{' '}
            og{' '}
            <Link to='/gdpr'>
              <span>personvernregler</span>
            </Link>
          </span>
        </div>
        {/* <ReactToPrint
          trigger={() => (
            <button
              ref={printButtonRef}
              // disabled={!isChecked}
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
                cursor: 'pointer',
              }}
            >
              Last ned CV
            </button>
          )}
          documentTitle={cvData.saveAs}
          content={() => pdfComponent}
          onBeforeGetContent={() => {
            setPageWidth(true)
          }}
          onAfterPrint={() => {
            sendPrintedDocument()
            setDisplayTemplate(false)
            setChangeOccured(!changeOccured)
          }}
        /> */}
      </div>
      <div>
        <PDFDownloadLink
          onClick={() => {
            setIsClicked(true)
          }}
          document={
            <DataToRender
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'red',
              }}
            />
          }
          filename='FORM.pdf'
        >
          {({ blob, url, loading, error }) =>
            error ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
        <Text onClick={() => setIsChecked(true)}>Preview</Text>

        {clicked && (
          <View
          // style={{height:"100%",width:"100%",padding:"20px"}}
          >
            <Text
              onClick={() => {
                setIsClicked(false)
              }}
            >
              close
            </Text>
            <PDFViewer style={styles.documentViewer}>
              <DataToRender />
            </PDFViewer>
          </View>
        )}
      </div>
    </>
  )
}

// {({ loading }) =>
// loading ? (
//   <button>Loading Document...</button>
// ) : (
//   <button
//     // ref={printButtonRef}
//     // disabled={!isChecked}
//     style={{
//       marginTop: '10px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: '180px',
//       borderRadius: '5px',
//       gap: '5px',
//       background: '#F6F3F1',
//       padding: '10px',
//       fontFamily: 'Montserrat',
//       fontWeight: '600',
//       fontSize: '16px',
//       border: '1px solid #F6F3F1',
//       backgroundColor: '#eeb856',
//       margin: '10px',
//       cursor: 'pointer',
//     }}
//   >
//     Last ned CV
//   </button>
// )
// }
export default TemplateEight
