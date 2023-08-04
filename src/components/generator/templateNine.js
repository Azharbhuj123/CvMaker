import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  propertiesData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  referenceData,
  languageData,
  profileRichTextData,
  getRefToggle,
  getNewRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import ReactToPrint from 'react-to-print'
import { Editor } from 'draft-js'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import {
  sendFileToBackend,
  sendPrintedDocument,
} from '../../helper/helperFunctions'
import moment from 'moment'
import TimesNewRomanRegular from '../../assests/fonts/Times New Roman/timesnewroman.ttf'
import TimesNewRomanBold from '../../assests/fonts/Times New Roman/timesnewromanbold.ttf'
import CalibriRegular from '../../assests/fonts/Calibri-Font/Calibri/Calibri.ttf'
import CalibriBold from '../../assests/fonts/Calibri-Font/Calibri/calibrib.ttf'
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
import axios from 'axios'
import close from '../../../src/assests/images/circle-xmark.png'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const TemplateNine = () => {
  let printButtonRef = useRef()
  const cvData = useSelector(CV_DATA)
  const toggleData = useSelector(getRefToggle)
  const newToggleData = useSelector(getNewRefToggle)
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let pdfComponent = useRef()
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const progressData = useSelector(propertiesData)
  const [isChecked, setIsChecked] = useState(false)

  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const skills = useSelector(propertiesData)
  const languages = useSelector(languageData)
  const profileData = useSelector(profileRichTextData)
  const [changeOccured, setChangeOccured] = useState(false)
  const courses = useSelector(coursesData)
  const references = useSelector(referenceData)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Listen to window resize events and update the windowWidth state
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth])

  const showPDFViewer = windowWidth >= 768

  const showButton = windowWidth < 769

  // MODAL
  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('template-nine-container'),
      cvData.email,
      displayTemplate
    )
  }

  Font.register({
    family: 'Times New Roman',
    fonts: [{ src: TimesNewRomanRegular }, { src: TimesNewRomanBold }],
  })

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

  Font.register({
    family: 'Calibri',
    fonts: [{ src: CalibriRegular }, { src: CalibriBold }],
  })

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
    },
    document: {
      width: '100%',
      height: '100vh',
    },
    pageLeftSection: {
      backgroundColor: '#203864',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '30%',
      color: 'white',
      // fontFamily: 'Times New Roman',
    },
    titleBox: {
      width: '100%',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 32,
      marginBottom: 16,
      gap: 10,
    },
    titleBoxTitle: {
      textAlign: 'center',
      fontFamily: 'Times New Roman',
      fontSize: 18,
      marginBlockStart: 18,
      marginBlockEnd: 18,
      marginInlineStart: 0,
      marginInlineEnd: 0,
      fontWeight: 'bold',
    },
    titleBoxSubitle: {
      textAlign: 'center',
      fontFamily: 'Times New Roman',
      fontSize: 14,
      marginBlockStart: 16,
      marginBlockEnd: 16,
      marginInlineStart: 0,
      marginInlineEnd: 0,
      fontWeight: 700,
    },
    detailSection: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
      padding: 5,
      gap: 14,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingLeft: 5,
    },
    detail: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      wordBreak: 'break-all',
      paddingLeft: 10,
    },
    detailTitle: {
      fontFamily: 'Times New Roman',
      fontWeight: 900,
      fontSize: 18,
      position: 'relative',
      paddingBottom: 5,
      textDecoration: 'none',
    },
    addressTitle: {
      fontFamily: 'Times New Roman',
      fontWeight: 900,
      fontSize: 12,
      paddingVertical: 10,
      paddingHorizontal: 0,
    },
    addressText: {
      fontFamily: 'Calibri',
      fontSize: 12,
    },
    skillSection: {
      display: 'flex',
      width: '80%',
      flexdirection: 'column',
      textAlign: 'left',
      gap: 2,
      color: 'white',
      paddingVertical: 20,
      paddingHorizontal: 0,
      marginLeft: 10,
    },
    skillTitle: {
      fontFamily: 'Times New Roman',
      fontSize: 20,
      fontWeight: 700,
      textDecoration: 'none',
      width: '100%',
      marginBottom: 5,
    },
    skillProgressBar: {
      // marginTop: 14,
    },
    skillProgressBarText: {
      fontFamily: 'Calibri',
      fontSize: 14,
      fontWeight: 900,
    },
    // skillProgressBarLine: {
    //   backgroundColor: 'rgb(59, 88, 141)',
    //   height: 1,
    //   width: '95%',
    //   marginTop: 8,
    // },
    skillProgressBarLineWrapper: {
      // paddingTop: 10,
      fontFamily: 'Calibri',
      fontSize: 14,
      color: 'white',
      fontWeight: 700,
    },
    languageSection: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      wordbreak: 'break-all',
      paddingLeft: 10,
    },
    languageTitle: {
      fontFamily: 'Times New Roman',
      fontSize: 16,
      fontWeight: 700,
      color: 'white',
      paddingTop: 10,
      paddingBottom: 5,
      paddingHorizontal: 0,
    },
    languageText: {
      fontFamily: 'Calibri',
      fontSize: 11,
      color: 'white',
    },
    pageRightSection: {
      width: '70%',
      padding: 12,
    },
    profileSectionWrapper: {
      display: 'flex',
      width: '90%',
    },
    profileTitle: {
      fontFamily: 'Times New Roman',
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
      position: 'relative',
      // paddingBottom: 10,
      textDecoration: 'none',
    },
    profileTitleToggle: {
      fontSize: 14,
      fontWeight: 'Bold',
      fontFamily: 'Calibri',
    },
    profilePara: {
      fontFamily: 'Calibri',
      fontSize: 14,
      color: 'black',
      fontWeight: 700,
      wordBreak: 'break-all',
    },
    experiencePara: {
      fontFamily: 'Calibri',
      fontSize: 14,
      color: 'black',
      fontWeight: 700,
      wordBreak: 'break-all',
    },
    experienceSectionWrapper: {
      display: 'flex',
      width: '90%',
      marginTop: 12,
    },
    experienceFrom: {
      fontFamily: 'Calibri',
      fontSize: 14,
      fontWeight: 700,
      color: 'black',
      wordBreak: 'break-all',
    },
    experienceDate: {
      fontFamily: 'Calibri',
      fontSize: 14,
      fontWeight: 700,
      // marginBottom: 8,
      wordBreak: 'break-all',
      color: 'gray',
    },
    referenceText: {
      fontFamily: 'Calibri',
      fontSize: 14,
      color: 'black',
      fontWeight: 900,
      wordBreak: 'break-all',
      marginTop: 8,
    },
  })
  const Proceed = () => {
    return (
      <button className='proceed-button' onClick={() => handleModalOpen()}>
        <MdArrowForwardIos />
      </button>
    )
  }
  return (
    <>
      {showButton && <Proceed />}
      {showPDFViewer ? (
        <PDFViewer style={styles.document} showToolbar={false}>
          <Document style={styles.document}>
            <Page size='A4' style={styles.page}>
              <View style={styles.pageLeftSection}>
                <View style={styles.titleBox}>
                  <Text style={styles.titleBoxTitle}>
                    {cvData.firstName + ' ' + cvData.lastName}
                  </Text>
                  <Text style={styles.titleBoxSubitle}>{cvData.jobTitle}</Text>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.detail}>
                    <Text style={styles.detailTitle}>Detaljer</Text>
                    <Text style={styles.addressTitle}>ADRESSE</Text>
                    <Text style={styles.addressText}>
                      {cvData?.physicalAddress}
                    </Text>
                    {/* </View>

            <View style={styles.detail}> */}
                    <Text style={styles.addressTitle}>Telefon</Text>
                    <Text style={styles.addressText}>{cvData?.phone}</Text>

                    <Text style={styles.addressTitle}>E-post</Text>
                    <Text style={styles.addressText}>{cvData?.email}</Text>

                    <Text style={styles.addressTitle}>Fødselsdato</Text>
                    <Text style={styles.addressText}>
                      {moment(cvData?.DOB).format('DD,MM,YYYY')}
                    </Text>

                    <Text style={styles.addressTitle}>Postnummer</Text>
                    <Text style={styles.addressText}>{cvData?.zipCode}</Text>
                    {cvData.drivingLicense !== '' ? (
                      <>
                        <Text style={styles.addressTitle}>Førerkort</Text>
                        <Text style={styles.addressText}>
                          {cvData?.drivingLicense}
                        </Text>
                      </>
                    ) : null}
                  </View>
                </View>

                <View style={styles.skillSection}>
                  <Text style={styles.skillTitle}>Ferdigheter</Text>
                  {progressData.map((item, index) => {
                    return (
                      <View style={styles.skillProgressBar} key={index}>
                        {cvData?.displayProgressBar === true ? (
                          <View
                            key={index}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              fontFamily: 'Calibri',
                              fontWeight: 'bold',
                              marginTop: '10px',
                            }}
                          >
                            {console.log(
                              item.value,
                              cvData.displayProgressBar,
                              'percentage'
                            )}
                            {cvData.displayProgressBar === true ? (
                              <View>
                                <Text style={{ fontSize: '12px' }}>
                                  {item?.name}
                                </Text>
                                <View
                                  style={{
                                    backgroundColor: 'rgb(59, 88, 141)',
                                    height: '1px',
                                    marginTop: '5px',
                                  }}
                                >
                                  <View
                                    style={{
                                      width: `${item?.value}%`,
                                      color: '#3b588d',
                                      backgroundColor: '#ffff',
                                      height: '1px',
                                    }}
                                  ></View>
                                </View>
                              </View>
                            ) : (
                              <Text style={{ fontSize: '12px' }}>
                                {item?.name}
                              </Text>
                            )}
                          </View>
                        ) : (
                          <Text style={styles.skillProgressBarLineWrapper}>
                            {item?.name}
                          </Text>
                        )}
                      </View>
                    )
                  })}
                </View>

                <View style={styles.languageSection}>
                  <Text style={styles.languageTitle}>Språk</Text>
                  {languages.map((item, index) => {
                    return (
                      <>
                        <Text style={styles.languageText} key={index}>
                          {item?.name + item?.value}
                        </Text>
                      </>
                    )
                  })}
                </View>

                {accordiansEnabled.Hobbyer === true ? (
                  <View style={styles.languageSection}>
                    <Text style={styles.languageTitle}>Hobby</Text>
                    {hobbies.map((item, index) => {
                      return (
                        <>
                          <Text style={styles.languageText} key={index}>
                            {item?.name}
                          </Text>
                        </>
                      )
                    })}
                  </View>
                ) : null}

                {accordiansEnabled.Kurs === true ? (
                  <View style={styles.languageSection}>
                    <Text style={styles.languageTitle}>Kurs</Text>
                    {courses.map((item, index) => {
                      return (
                        <>
                          <Text style={styles.languageText} key={index}>
                            {item?.name}
                          </Text>
                        </>
                      )
                    })}
                  </View>
                ) : null}
              </View>

              <View style={styles.pageRightSection}>
                {profileData !== '' ? (
                  <>
                    <View style={styles.profileSection}>
                      <View style={styles.profileSectionWrapper}>
                        <Text style={styles.profileTitle}>PROFIL</Text>
                        <View style={{ marginTop: '10px' }}>
                          <Text style={styles.profilePara}>
                            {profileData.replace(/(<([^>]+)>)/gi, '')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                ) : null}

                <View style={styles.experienceSectionWrapper}>
                  <Text style={styles.profileTitle}>Arbeidserfaring</Text>
                  {experianceData.map((item, index) => {
                    return (
                      <>
                        <View key={index} style={{ marginTop: '10px' }}>
                          <Text style={styles.experienceFrom}>
                            {item?.jobTitle} - {item?.employer}
                          </Text>
                          <Text style={styles.experienceDate}>
                            {item?.startDate} -{' '}
                            {item.toggle ? 'dags dato' : item?.endDate}
                          </Text>
                          <View>
                            <Text style={styles.experiencePara}>
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </View>
                      </>
                    )
                  })}
                </View>

                {accordiansEnabled.Praksisplasser === true ? (
                  <View style={styles.experienceSectionWrapper}>
                    <Text style={styles.profileTitle}>Praksisplasser</Text>
                    {internships.map((item, index) => {
                      return (
                        <>
                          <View key={index} style={{ marginTop: '10px' }}>
                            <Text style={styles.experienceFrom}>
                              {item?.jobTitle} - {item?.employer}{' '}
                            </Text>
                            <Text style={styles.experienceDate}>
                              {moment(item?.startDate).format('YYYY-MM')} -{' '}
                              {item.toggle
                                ? 'dags dato'
                                : moment(item?.endDate).format('YYYY-MM')}
                            </Text>
                            <View>
                              <Text style={styles.experiencePara}>
                                {item.additionalInformation.replace(
                                  /(<([^>]+)>)/gi,
                                  ''
                                )}
                              </Text>
                            </View>
                          </View>
                        </>
                      )
                    })}
                  </View>
                ) : null}

                <View style={styles.experienceSectionWrapper}>
                  <Text style={styles.profileTitle}>Utdanning</Text>
                  {educationData.map((item, index) => {
                    return (
                      <>
                        <View key={index} style={{ marginTop: '10px' }}>
                          <Text style={styles.experienceFrom}>
                            {item?.study} - {item?.school}
                          </Text>
                          <Text style={styles.experienceDate}>
                            {item?.startDate + ' -'}{' '}
                            {item.toggle ? 'dags dato' : item?.endDate}{' '}
                          </Text>
                          <View>
                            <Text style={styles.experiencePara}>
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </View>
                      </>
                    )
                  })}
                </View>

                {accordiansEnabled.Referanser === true ? (
                  <View style={styles.experienceSectionWrapper}>
                    <Text style={styles.profileTitle}>REFERANSER</Text>
                    {newToggleData ? (
                      <Text style={styles.profileTitleToggle}>
                        Oppgis ved forespørsel
                      </Text>
                    ) : (
                      <>
                        {references.map((item, index) => {
                          return (
                            <Text style={styles.referenceText} key={index}>
                              {item?.name}, {item?.companyName} - {item?.email}
                            </Text>
                          )
                        })}
                      </>
                    )}
                  </View>
                ) : null}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      ) : null}
      {showPDFViewer ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#f6f3f1',
            alignItems: 'center',
          }}
        >
          <EndreMaalButton />
          <div className='gdpr-image'>
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
              <span style={{ color: 'red' }}>
                {' '}
                Husk å trykke på 'Oppdater tekst' før du laster ned CV-en din
              </span>
            </span>
          </div>
          <PDFDownloadLink
            document={
              <Document style={styles.document}>
                <Page size='A4' style={styles.page}>
                  <View style={styles.pageLeftSection}>
                    <View style={styles.titleBox}>
                      <Text style={styles.titleBoxTitle}>
                        {cvData.firstName + ' ' + cvData.lastName}
                      </Text>
                      <Text style={styles.titleBoxSubitle}>
                        {cvData.jobTitle}
                      </Text>
                    </View>

                    <View style={styles.detailSection}>
                      <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Detaljer</Text>
                        <Text style={styles.addressTitle}>ADRESSE</Text>
                        <Text style={styles.addressText}>
                          {cvData?.physicalAddress}
                        </Text>
                        {/* </View>
  
              <View style={styles.detail}> */}
                        <Text style={styles.addressTitle}>Telefon</Text>
                        <Text style={styles.addressText}>{cvData?.phone}</Text>

                        <Text style={styles.addressTitle}>E-post</Text>
                        <Text style={styles.addressText}>{cvData?.email}</Text>

                        <Text style={styles.addressTitle}>Fødselsdato</Text>
                        <Text style={styles.addressText}>
                          {moment(cvData?.DOB).format('DD,MM,YYYY')}
                        </Text>

                        <Text style={styles.addressTitle}>Postnummer</Text>
                        <Text style={styles.addressText}>
                          {cvData?.zipCode}
                        </Text>
                        {cvData.drivingLicense !== '' ? (
                          <>
                            <Text style={styles.addressTitle}>Førerkort</Text>
                            <Text style={styles.addressText}>
                              {cvData?.drivingLicense}
                            </Text>
                          </>
                        ) : null}
                      </View>
                    </View>

                    <View style={styles.skillSection}>
                      <Text style={styles.skillTitle}>Ferdigheter</Text>
                      {progressData.map((item, index) => {
                        return (
                          <View style={styles.skillProgressBar} key={index}>
                            {cvData?.displayProgressBar === true ? (
                              <View
                                key={index}
                                style={{
                                  width: '100%',
                                  textAlign: 'left',
                                  fontFamily: 'Calibri',
                                  fontWeight: 'bold',
                                  marginTop: '10px',
                                }}
                              >
                                {console.log(
                                  item.value,
                                  cvData.displayProgressBar,
                                  'percentage'
                                )}
                                {cvData.displayProgressBar === true ? (
                                  <View>
                                    <Text style={{ fontSize: '12px' }}>
                                      {item?.name}
                                    </Text>
                                    <View
                                      style={{
                                        backgroundColor: 'rgb(59, 88, 141)',
                                        height: '1px',
                                        marginTop: '5px',
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: `${item?.value}%`,
                                          color: '#3b588d',
                                          backgroundColor: '#ffff',
                                          height: '1px',
                                        }}
                                      ></View>
                                    </View>
                                  </View>
                                ) : (
                                  <Text style={{ fontSize: '12px' }}>
                                    {item?.name}
                                  </Text>
                                )}
                              </View>
                            ) : (
                              <Text style={styles.skillProgressBarLineWrapper}>
                                {item?.name}
                              </Text>
                            )}
                          </View>
                        )
                      })}
                    </View>

                    <View style={styles.languageSection}>
                      <Text style={styles.languageTitle}>Språk</Text>
                      {languages.map((item, index) => {
                        return (
                          <>
                            <Text style={styles.languageText} key={index}>
                              {item?.name + item?.value}
                            </Text>
                          </>
                        )
                      })}
                    </View>

                    {accordiansEnabled.Hobbyer === true ? (
                      <View style={styles.languageSection}>
                        <Text style={styles.languageTitle}>Hobby</Text>
                        {hobbies.map((item, index) => {
                          return (
                            <>
                              <Text style={styles.languageText} key={index}>
                                {item?.name}
                              </Text>
                            </>
                          )
                        })}
                      </View>
                    ) : null}

                    {accordiansEnabled.Kurs === true ? (
                      <View style={styles.languageSection}>
                        <Text style={styles.languageTitle}>Kurs</Text>
                        {courses.map((item, index) => {
                          return (
                            <>
                              <Text style={styles.languageText} key={index}>
                                {item?.name}
                              </Text>
                            </>
                          )
                        })}
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.pageRightSection}>
                    {profileData !== '' ? (
                      <>
                        <View style={styles.profileSection}>
                          <View style={styles.profileSectionWrapper}>
                            <Text style={styles.profileTitle}>PROFIL</Text>
                            <View style={{ marginTop: '10px' }}>
                              <Text style={styles.profilePara}>
                                {profileData.replace(/(<([^>]+)>)/gi, '')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </>
                    ) : null}

                    <View style={styles.experienceSectionWrapper}>
                      <Text style={styles.profileTitle}>Arbeidserfaring</Text>
                      {experianceData.map((item, index) => {
                        return (
                          <>
                            <View key={index} style={{ marginTop: '10px' }}>
                              <Text style={styles.experienceFrom}>
                                {item?.jobTitle} - {item?.employer}
                              </Text>
                              <Text style={styles.experienceDate}>
                                {item?.startDate} -{' '}
                                {item.toggle ? 'dags dato' : item?.endDate}
                              </Text>
                              <View>
                                <Text style={styles.experiencePara}>
                                  {item.additionalInformation.replace(
                                    /(<([^>]+)>)/gi,
                                    ''
                                  )}
                                </Text>
                              </View>
                            </View>
                          </>
                        )
                      })}
                    </View>

                    {accordiansEnabled.Praksisplasser === true ? (
                      <View style={styles.experienceSectionWrapper}>
                        <Text style={styles.profileTitle}>Praksisplasser</Text>
                        {internships.map((item, index) => {
                          return (
                            <>
                              <View key={index} style={{ marginTop: '10px' }}>
                                <Text style={styles.experienceFrom}>
                                  {item?.jobTitle} - {item?.employer}{' '}
                                </Text>
                                <Text style={styles.experienceDate}>
                                  {moment(item?.startDate).format('YYYY-MM')} -{' '}
                                  {item.toggle
                                    ? 'dags dato'
                                    : moment(item?.endDate).format('YYYY-MM')}
                                </Text>
                                <View>
                                  <Text style={styles.experiencePara}>
                                    {item.additionalInformation.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )
                        })}
                      </View>
                    ) : null}

                    <View style={styles.experienceSectionWrapper}>
                      <Text style={styles.profileTitle}>Utdanning</Text>
                      {educationData.map((item, index) => {
                        return (
                          <>
                            <View key={index} style={{ marginTop: '10px' }}>
                              <Text style={styles.experienceFrom}>
                                {item?.study} - {item?.school}
                              </Text>
                              <Text style={styles.experienceDate}>
                                {item?.startDate + ' -'}{' '}
                                {item.toggle ? 'dags dato' : item?.endDate}{' '}
                              </Text>
                              <View>
                                <Text style={styles.experiencePara}>
                                  {item.additionalInformation.replace(
                                    /(<([^>]+)>)/gi,
                                    ''
                                  )}
                                </Text>
                              </View>
                            </View>
                          </>
                        )
                      })}
                    </View>

                    {accordiansEnabled.Referanser === true ? (
                      <View style={styles.experienceSectionWrapper}>
                        <Text style={styles.profileTitle}>REFERANSER</Text>
                        {newToggleData ? (
                          <Text style={styles.profileTitleToggle}>
                            Oppgis ved forespørsel
                          </Text>
                        ) : (
                          <>
                            {references.map((item, index) => {
                              return (
                                <Text style={styles.referenceText} key={index}>
                                  {item?.name}, {item?.companyName} -{' '}
                                  {item?.email}
                                </Text>
                              )
                            })}
                          </>
                        )}
                      </View>
                    ) : null}
                  </View>
                </Page>
              </Document>
            }
            fileName={`${cvData.firstName}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                'Loading Pdf...'
              ) : (
                <button
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '160px',
                    borderRadius: '5px',
                    gap: '5px',
                    background: '#F6F3F1',
                    padding: '10px',
                    fontFamily: 'Montserrat',
                    fontWeight: '600',
                    fontSize: '16px',
                    border: '1px solid #F6F3F1',
                    backgroundColor: '#eeb856',
                    margin: '10px 20px 20px 0px',
                    cursor: 'pointer',
                  }}
                  onClick={() => sendPDFToBackend(blob)}
                >
                  Last ned CV
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      ) : null}
      {isModalOpen && (
        <div className='modalOverlay'>
          {/* <div className='modalContent'> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '80%',
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '20px',
              alignItems: 'center',
              position: 'absolute',
              top: '35%',
              left: '10%',
            }}
          >
            <div
              style={{ display: 'flex', alignSelf: 'end', cursor: 'pointer' }}
              onClick={() => {
                handleModalClose()
              }}
            >
              <img src={close} alt='' style={{ width: '30px' }} />
            </div>
            <div
              style={{
                width: '100%',
                fontFamily: 'Montessarat',
                fontSize: '14px',
                fontWeight: 400,
              }}
            >
              <h1 style={{ textAlign: 'center', marginBottom: '1em' }}>
                Vilkår og betingelser
              </h1>
              <span>
                Ved å trykke på "laste ned", vil du laste ned CVen du har laget
                forplikte deg til å akseptere våre
                <Link to='/gdpr'>
                  <span>vilkår og betingelser</span>
                </Link>
                og
                <Link to='/gdpr'>
                  <span>personvernregler</span>
                </Link>
                <span>vilkår og betingelser</span>
              </span>
            </div>

            <PDFDownloadLink
              document={
                <Document style={styles.document}>
                  <Page size='A4' style={styles.page}>
                    <View style={styles.pageLeftSection}>
                      <View style={styles.titleBox}>
                        <Text style={styles.titleBoxTitle}>
                          {cvData.firstName + ' ' + cvData.lastName}
                        </Text>
                        <Text style={styles.titleBoxSubitle}>
                          {cvData.jobTitle}
                        </Text>
                      </View>

                      <View style={styles.detailSection}>
                        <View style={styles.detail}>
                          <Text style={styles.detailTitle}>Detaljer</Text>
                          <Text style={styles.addressTitle}>ADRESSE</Text>
                          <Text style={styles.addressText}>
                            {cvData?.physicalAddress}
                          </Text>
                          {/* </View>

            <View style={styles.detail}> */}
                          <Text style={styles.addressTitle}>Telefon</Text>
                          <Text style={styles.addressText}>
                            {cvData?.phone}
                          </Text>

                          <Text style={styles.addressTitle}>E-post</Text>
                          <Text style={styles.addressText}>
                            {cvData?.email}
                          </Text>

                          <Text style={styles.addressTitle}>Fødselsdato</Text>
                          <Text style={styles.addressText}>
                            {moment(cvData?.DOB).format('DD,MM,YYYY')}
                          </Text>

                          <Text style={styles.addressTitle}>Postnummer</Text>
                          <Text style={styles.addressText}>
                            {cvData?.zipCode}
                          </Text>
                          {cvData.drivingLicense !== '' ? (
                            <>
                              <Text style={styles.addressTitle}>Førerkort</Text>
                              <Text style={styles.addressText}>
                                {cvData?.drivingLicense}
                              </Text>
                            </>
                          ) : null}
                        </View>
                      </View>

                      <View style={styles.skillSection}>
                        <Text style={styles.skillTitle}>Ferdigheter</Text>
                        {progressData.map((item, index) => {
                          return (
                            <View style={styles.skillProgressBar} key={index}>
                              {cvData?.displayProgressBar === true ? (
                                <View
                                  key={index}
                                  style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    fontFamily: 'Calibri',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                  }}
                                >
                                  {console.log(
                                    item.value,
                                    cvData.displayProgressBar,
                                    'percentage'
                                  )}
                                  {cvData.displayProgressBar === true ? (
                                    <View>
                                      <Text style={{ fontSize: '12px' }}>
                                        {item?.name}
                                      </Text>
                                      <View
                                        style={{
                                          backgroundColor: 'rgb(59, 88, 141)',
                                          height: '1px',
                                          marginTop: '5px',
                                        }}
                                      >
                                        <View
                                          style={{
                                            width: `${item?.value}%`,
                                            color: '#3b588d',
                                            backgroundColor: '#ffff',
                                            height: '1px',
                                          }}
                                        ></View>
                                      </View>
                                    </View>
                                  ) : (
                                    <Text style={{ fontSize: '12px' }}>
                                      {item?.name}
                                    </Text>
                                  )}
                                </View>
                              ) : (
                                <Text
                                  style={styles.skillProgressBarLineWrapper}
                                >
                                  {item?.name}
                                </Text>
                              )}
                            </View>
                          )
                        })}
                      </View>

                      <View style={styles.languageSection}>
                        <Text style={styles.languageTitle}>Språk</Text>
                        {languages.map((item, index) => {
                          return (
                            <>
                              <Text style={styles.languageText} key={index}>
                                {item?.name + item?.value}
                              </Text>
                            </>
                          )
                        })}
                      </View>

                      {accordiansEnabled.Hobbyer === true ? (
                        <View style={styles.languageSection}>
                          <Text style={styles.languageTitle}>Hobby</Text>
                          {hobbies.map((item, index) => {
                            return (
                              <>
                                <Text style={styles.languageText} key={index}>
                                  {item?.name}
                                </Text>
                              </>
                            )
                          })}
                        </View>
                      ) : null}

                      {accordiansEnabled.Kurs === true ? (
                        <View style={styles.languageSection}>
                          <Text style={styles.languageTitle}>Kurs</Text>
                          {courses.map((item, index) => {
                            return (
                              <>
                                <Text style={styles.languageText} key={index}>
                                  {item?.name}
                                </Text>
                              </>
                            )
                          })}
                        </View>
                      ) : null}
                    </View>

                    <View style={styles.pageRightSection}>
                      {profileData !== '' ? (
                        <>
                          <View style={styles.profileSection}>
                            <View style={styles.profileSectionWrapper}>
                              <Text style={styles.profileTitle}>PROFIL</Text>
                              <View style={{ marginTop: '10px' }}>
                                <Text style={styles.profilePara}>
                                  {profileData.replace(/(<([^>]+)>)/gi, '')}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </>
                      ) : null}

                      <View style={styles.experienceSectionWrapper}>
                        <Text style={styles.profileTitle}>Arbeidserfaring</Text>
                        {experianceData.map((item, index) => {
                          return (
                            <>
                              <View key={index} style={{ marginTop: '10px' }}>
                                <Text style={styles.experienceFrom}>
                                  {item?.jobTitle} - {item?.employer}
                                </Text>
                                <Text style={styles.experienceDate}>
                                  {item?.startDate} -{' '}
                                  {item.toggle ? 'dags dato' : item?.endDate}
                                </Text>
                                <View>
                                  <Text style={styles.experiencePara}>
                                    {item.additionalInformation.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )
                        })}
                      </View>

                      {accordiansEnabled.Praksisplasser === true ? (
                        <View style={styles.experienceSectionWrapper}>
                          <Text style={styles.profileTitle}>
                            Praksisplasser
                          </Text>
                          {internships.map((item, index) => {
                            return (
                              <>
                                <View key={index} style={{ marginTop: '10px' }}>
                                  <Text style={styles.experienceFrom}>
                                    {item?.jobTitle} - {item?.employer}{' '}
                                  </Text>
                                  <Text style={styles.experienceDate}>
                                    {moment(item?.startDate).format('YYYY-MM')}{' '}
                                    -{' '}
                                    {item.toggle
                                      ? 'dags dato'
                                      : moment(item?.endDate).format('YYYY-MM')}
                                  </Text>
                                  <View>
                                    <Text style={styles.experiencePara}>
                                      {item.additionalInformation.replace(
                                        /(<([^>]+)>)/gi,
                                        ''
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </>
                            )
                          })}
                        </View>
                      ) : null}

                      <View style={styles.experienceSectionWrapper}>
                        <Text style={styles.profileTitle}>Utdanning</Text>
                        {educationData.map((item, index) => {
                          return (
                            <>
                              <View key={index} style={{ marginTop: '10px' }}>
                                <Text style={styles.experienceFrom}>
                                  {item?.study} - {item?.school}
                                </Text>
                                <Text style={styles.experienceDate}>
                                  {item?.startDate + ' -'}{' '}
                                  {item.toggle ? 'dags dato' : item?.endDate}{' '}
                                </Text>
                                <View>
                                  <Text style={styles.experiencePara}>
                                    {item.additionalInformation.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )
                        })}
                      </View>

                      {accordiansEnabled.Referanser === true ? (
                        <View style={styles.experienceSectionWrapper}>
                          <Text style={styles.profileTitle}>REFERANSER</Text>
                          {newToggleData ? (
                            <Text style={styles.profileTitleToggle}>
                              Oppgis ved forespørsel
                            </Text>
                          ) : (
                            <>
                              {references.map((item, index) => {
                                return (
                                  <Text
                                    style={styles.referenceText}
                                    key={index}
                                  >
                                    {item?.name}, {item?.companyName} -{' '}
                                    {item?.email}
                                  </Text>
                                )
                              })}
                            </>
                          )}
                        </View>
                      ) : null}
                    </View>
                  </Page>
                </Document>
              }
              fileName={`${cvData.firstName}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  'Loading Pdf...'
                ) : (
                  <button
                    style={{
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      width: '160px',
                      borderRadius: '5px',
                      gap: '5px',
                      background: '#F6F3F1',
                      padding: '10px',
                      fontFamily: 'Montserrat',
                      fontWeight: '600',
                      fontSize: '16px',
                      border: '1px solid #F6F3F1',
                      backgroundColor: '#eeb856',
                      margin: '10px 20px 20px 0px',
                      cursor: 'pointer',
                    }}
                    onClick={() => sendPDFToBackend(blob)}
                  >
                    Last ned CV
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
          {/* </div> */}
        </div>
      )}
    </>
  )
}

export default TemplateNine
