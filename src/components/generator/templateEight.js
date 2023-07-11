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
  getNewRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment, { duration } from 'moment'
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
import { IsRenderingContext } from '../../context/IsRenderingContext'
import { useContext } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
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
  const newToggleData = useSelector(getNewRefToggle)

  console.log(educationData,"education data")
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
    AOS.init({ duration: 1200 })
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
      paddingVertical: 10,
      paddingHorizontal: 10,
      position: 'absolute',
      width: '70%',
      top: 25,
      left: '15%',
      border: ' 3px solid #b19c7d',
      color: '#b19c7d',
    },
    mainTitle: {
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontSize: 36,
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
      marginTop: 160,
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
      marginTop: 161,
    },
    profileSection: {
      borderBottom: '3px solid #b19c7d',
      color: '#b19c7d',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 700,
      textAlign: 'left',
      paddingBottom: 8,
    },
    profileSectionText: {
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 200,
      marginVertical: 15,
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
      marginBottom: 15,
    },
    referenseText: {
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 200,
      wordBreak: 'break-word',
      marginBottom: 5,
    },
  })
  const { isRendering, setIsRendering } = useContext(IsRenderingContext)

  return (
    <>
      {console.log(isRendering, 'redndnddjdjdj')}
      <PDFViewer data-aos='fade-top' style={styles.document}>
        <Document style={styles.document}>
          {isRendering && (
            <Page size='A4' style={styles.page}>
              {/* <View>
      {' '}
      style={styles.templateEight} */}
              <View style={styles.pageLeftSection}>
                <Text style={styles.detailSection}>DETALJER</Text>
                <View style={styles.detailSectionContent}>
                  {cvData.physicalAddress !== '' ? (
                    <Text style={styles.detailSectionContentAdress}>
                      ADRESSE
                    </Text>
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
                    <Text style={styles.detailSectionContentAdress}>
                      POST KODE
                    </Text>
                  ) : null}
                  {cvData?.zipCode !== '' ? (
                    <Text style={styles.detailSectionContentAddressText}>
                      {cvData?.zipCode}
                    </Text>
                  ) : null}

                  {cvData?.drivingLicense ? (
                    <Text style={styles.detailSectionContentAdress}>
                      FØRERKORT
                    </Text>
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
                              <View>
                                <Text
                                  style={{
                                    fontSize: '10px',
                                    fontFamily: 'Roboto',
                                    marginTop: '5px',
                                    width: `${item?.value}%`,
                                  }}
                                >
                                  {item?.name}
                                </Text>
                                <View
                                  style={{
                                    color: 'white',
                                    width: `${item?.value}%`,
                                    borderBottom: 'dotted',
                                    marginTop: '5px',
                                    borderBottom: '2px dotted rgb(177, 156, 125)'
                                  }}
                                >
                                </View>
                              </View>
                            </>
                          ) : (
                            <Text
                              style={styles.skillSectionContentText}
                              key={index}
                            >
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
                  <Text style={styles.languageSection}>SPRÅK</Text>
                  {lanuages?.map((item, index) => (
                    <Text style={styles.languageSectionText} key={index}>
                      {item?.name} {item?.value}
                    </Text>
                  ))}

                  {accordiansEnabled.Hobbyer === true ? (
                    <>
                      <Text style={styles.hobbySection}>HOBBY</Text>
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
                      <Text style={styles.hobbySection}>KURS</Text>
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
                      <Text
                        style={styles.experienceSectionContentText}
                        key={index}
                      >
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
                          {item.additionalInformation.replace(
                            /(<([^>]+)>)/gi,
                            ''
                          )}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>

                <Text style={styles.experienceSection}>UTDANNING</Text>
                {educationData?.map((item, index) => {
                  console.log(item,"iiiiiiiiiiii")
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
                          {item.additionalInformation.replace(
                            /(<([^>]+)>)/gi,
                            ''
                          )}
                        </Text>
                      </View>
                    </View>
                  )
                })}

                {accordiansEnabled.Praksisplasser === true ? (
                  <>
                    <Text style={styles.experienceSection}>PRAKSISPLASSER</Text>
                    {internships?.map((item, index) => (
                      <View
                        style={styles.experienceSectionContent}
                        keys={index}
                      >
                        <Text style={styles.experienceSectionContentText}>
                          {item?.jobTitle + ' - ' + item?.employer}
                        </Text>
                        <View style={styles.experienceSectionContentDate}>
                          <Text style={styles.experienceSectionContentDateText}>
                            {item.startDate.length === 0
                              ? 'Startdato -'
                              : moment(item?.startDate).format('YYYY-MM') +
                                ' - '}
                            {item.toggle
                              ? 'dags dato'
                              : item.endDate.length === 0
                              ? 'Sluttdato'
                              : moment(item?.endDate).format('YYYY-MM')}
                          </Text>
                        </View>
                        <View style={styles.experienceSectionContentPara}>
                          <Text style={styles.experienceSectionContentParaText}>
                            {item.additionalInformation.replace(
                              /(<([^>]+)>)/gi,
                              ''
                            )}
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
                        {newToggleData ? (
                          <Text style={styles.experienceSectionContentText}>
                            Oppgis ved forespørsel{' '}
                          </Text>
                        ) : (
                          <>
                            <Text style={styles.referenseText}>
                              {item?.name}
                            </Text>
                            <Text style={styles.referenseText}>
                              {item?.companyName}
                            </Text>
                            <Text style={styles.referenseText}>
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
          )}
        </Document>
      </PDFViewer>
    </>
  )
}

export default TemplateEight
