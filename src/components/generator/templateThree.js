import React, { useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  languageData,
  referenceData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  propertiesData,
  profileRichTextData,
  getRefToggle,
  getNewRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import ProgressBar from './progressBar'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'
import { useState } from 'react'
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  PDFViewer,
  PDFDownloadLink,
} from '@react-pdf/renderer'
import robotoBold from '../../assests/fonts/roboto/Roboto-Bold.ttf'
import robotoItalic from '../../assests/fonts/roboto/Roboto-Italic.ttf'
import robotoRegular from '../../assests/fonts/roboto/Roboto-Regular.ttf'
import robotoBoldItalic from '../../assests/fonts/roboto/Roboto-BoldItalic.ttf'
import { useContext } from 'react'
import axios from 'axios'
import close from '../../../src/assests/images/circle-xmark.png'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const TemplateThree = () => {
  let pdfComponent = useRef()
  let printButtonRef = useRef()
  const cvData = useSelector(CV_DATA)
  const hobbies = useSelector(getHobbies)
  const newToggleData = useSelector(getNewRefToggle)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const internships = useSelector(getInternships)
  const skillData = useSelector(propertiesData)
  const refrence = useSelector(referenceData)
  const courses = useSelector(coursesData)
  const profileData = useSelector(profileRichTextData)
  const lanuages = useSelector(languageData)
  const [isChecked, setIsChecked] = useState(false)
  const [changeOccured, setChangeOccured] = useState(false)
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

  // const sendPrintedDocument = async () => {
  //   await sendFileToBackend(
  //     document.getElementsByClassName('template-three-container'),
  //     cvData.email,
  //     displayTemplate
  //   )
  // }

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
      paddingTop: 10,
    },
    document: {
      width: '100%',
      height: '100vh',
    },
    container: {
      display: 'block',
      width: '100%',
    },
    header: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderBottom: '0.5px solid hsla(0,0%,75%,.543)',
    },
    headerTitle: {
      fontFamily: 'Roboto',
      fontSize: 38,
      color: 'black',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerSubtitle: {
      fontFamily: 'Roboto',
      fontSize: 20,
      textTransform: 'uppercase',
    },
    containerWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    containerWrapperLeft: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '30%',
    },
    containerWrapperLeftContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      paddingVertical: 12,
      paddingHorizontal: 12,
      width: '100%',
    },
    containerWrapperLeftContentTitle: {
      fontFamily: 'Roboto',
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 5,
      position: 'relative',
    },
    containerWrapperLeftContentTitleLine: {
      width: '30%',
      borderBottom: '3px solid black',
      position: 'absolute',
      top: 35,
      left: '8%',
    },
    containerWrapperLeftContentSubtitle: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    containerWrapperLeftContentSubtitleHeading: {
      fontFamily: 'Roboto',
      fontSize: 12,
      color: 'black',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    containerWrapperLeftContentSubtitleText: {
      fontFamily: 'Roboto',
      fontSize: 11,
      color: 'black',
      fontWeight: 400,
      overflowWrap: 'break-word',
    },
    progressWrapper: {
      padding: 12,
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    progressWrapperText: {
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 600,
      marginTop: 5,
    },
    otherSection: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 10,
    },
    otherSectionTitle: {
      fontFamily: 'Roboto',
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 10,
    },
    otherSectionPara: {
      fontFamily: 'Roboto',
      fontSize: 11,
    },
    containerWrapperRight: {
      borderLeft: '0.5px solid hsla(0,0%,75%,.543)',
      paddingVertical: 12,
      paddingHorizontal: 12,
      width: '70%',
      height: '100%',
    },
    profileSection: {
      borderBottom: '0.5px solid hsla(0,0%,75%,.543)',
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      paddingBottom: 15,
      width: '100%',
    },
    profileSectionPara: {
      fontFamily: 'Roboto',
      fontSize: 11,
      overflowWrap: 'break-word',
      // marginTop: 5,
    },
    profileWrapperLeftContentTitle: {
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: 700,
      paddingBottom: 5,
      position: 'relative',
    },
    profileWrapperLeftContentTitleLine: {
      width: '12%',
      borderBottom: '3px solid black',
      position: 'absolute',
      top: 23,
      left: '0%',
    },
    experienceSection: {
      marginTop: 10,
      borderBottom: '0.5px solid hsla(0,0%,75%,.543)',
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      paddingBottom: 15,
      width: '100%',
    },
    profileLeftContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    },
    profileLeftContentText: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 10,
    },
    profileLeftContentDate: {
      fontFamily: 'Roboto',
      fontSize: 10,
      wordBreak: 'breakWord',
    },
    profileLeftPara: {},
    profileLeftParaText: {
      color: 'black',
      fontFamily: 'Roboto',
      fontSize: 10,
      wordBreak: 'break-word',
    },
    referenceSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    },
    referenceSectionText: {
      color: 'black',
      fontFamily: 'Roboto',
      fontSize: 10,
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
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>
                    {cvData?.firstName + ' ' + cvData?.lastName}
                  </Text>
                  <Text style={styles.headerSubtitle}>{cvData.jobTitle}</Text>
                </View>

                <View style={styles.containerWrapper}>
                  <View style={styles.containerWrapperLeft}>
                    <View style={styles.containerWrapperLeftContent}>
                      <Text style={styles.containerWrapperLeftContentTitle}>
                        DETALJER
                      </Text>
                      <Text
                        style={styles.containerWrapperLeftContentTitleLine}
                      ></Text>
                      {cvData.physicalAddress === '' ? null : (
                        <View
                          style={styles.containerWrapperLeftContentSubtitle}
                        >
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleHeading
                            }
                          >
                            Adresse
                          </Text>
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleText
                            }
                          >
                            {cvData?.physicalAddress}
                          </Text>
                        </View>
                      )}

                      {cvData.phone === '' ? null : (
                        <View
                          style={styles.containerWrapperLeftContentSubtitle}
                        >
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleHeading
                            }
                          >
                            TELEFON
                          </Text>
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleText
                            }
                          >
                            {cvData?.phone}
                          </Text>
                        </View>
                      )}

                      {cvData?.email === '' ? null : (
                        <View
                          style={styles.containerWrapperLeftContentSubtitle}
                        >
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleHeading
                            }
                          >
                            E-POST
                          </Text>
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleText
                            }
                          >
                            {cvData?.email}
                          </Text>
                        </View>
                      )}

                      {cvData.DOB === '' ? null : (
                        <View
                          style={styles.containerWrapperLeftContentSubtitle}
                        >
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleHeading
                            }
                          >
                            FØDSELSDATO
                          </Text>
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleText
                            }
                          >
                            {moment(cvData?.DOB).format('DD,MM,YYYY')}
                          </Text>
                        </View>
                      )}

                      {cvData.country === '' ? null : (
                        <View
                          style={styles.containerWrapperLeftContentSubtitle}
                        >
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleHeading
                            }
                          >
                            BY
                          </Text>
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleText
                            }
                          >
                            {cvData?.country}
                          </Text>
                        </View>
                      )}

                      {cvData.zipCode === '' ? null : (
                        <View
                          style={styles.containerWrapperLeftContentSubtitle}
                        >
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleHeading
                            }
                          >
                            POST KODE
                          </Text>
                          <Text
                            style={
                              styles.containerWrapperLeftContentSubtitleText
                            }
                          >
                            {cvData?.zipCode}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.progressWrapper}>
                      <Text style={styles.containerWrapperLeftContentTitle}>
                        FERDIGHETER
                      </Text>
                      <Text
                        style={styles.containerWrapperLeftContentTitleLine}
                      ></Text>
                      {skillData?.map((item, index) =>
                        cvData.displayProgressBar === true ? (
                          <View>
                            <Text
                              style={{
                                fontSize: '10px',
                                fontFamily: 'Roboto',
                                fontWeight: 600,
                                marginTop: '5px',
                                width: '80%',
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
                                borderBottom: '2px dotted black',
                              }}
                            ></View>
                          </View>
                        ) : (
                          <Text style={styles.progressWrapperText}>
                            {item?.name}
                          </Text>
                        )
                      )}
                    </View>

                    <View style={styles.progressWrapper}>
                      <Text style={styles.containerWrapperLeftContentTitle}>
                        ANNET
                      </Text>
                      <Text
                        style={styles.containerWrapperLeftContentTitleLine}
                      ></Text>
                      <View style={styles.otherSection}>
                        <Text style={styles.otherSectionTitle}>Språk</Text>
                        {lanuages?.map((item, index) => (
                          <Text style={styles.otherSectionPara} key={index}>
                            {item.name} {item?.value}
                          </Text>
                        ))}

                        {accordiansEnabled.Hobbyer === true ? (
                          <>
                            <Text style={styles.otherSectionTitle}>Hobby</Text>
                            {hobbies?.map((item, index) => (
                              <Text style={styles.otherSectionPara} key={index}>
                                {index === hobbies.length - 1
                                  ? item.name + '.'
                                  : item.name + ', '}
                              </Text>
                            ))}
                          </>
                        ) : null}

                        {accordiansEnabled.Kurs === true ? (
                          <>
                            <Text style={styles.otherSectionTitle}>Kurs</Text>
                            {courses?.map((item, index) => (
                              <Text style={styles.otherSectionPara} key={index}>
                                {item.name}
                              </Text>
                            ))}
                          </>
                        ) : null}
                      </View>
                    </View>
                  </View>

                  <View style={styles.containerWrapperRight}>
                    {profileData !== '' ? (
                      <View style={styles.profileSection}>
                        <Text style={styles.profileWrapperLeftContentTitle}>
                          PROFIL
                        </Text>
                        <Text
                          style={styles.profileWrapperLeftContentTitleLine}
                        ></Text>

                        <View style={styles.profileSectionPara}>
                          <Text style={styles.profileSectionParaText}>
                            {profileData.replace(/(<([^>]+)>)/gi, '')}
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    <View style={styles.experienceSection}>
                      <Text style={styles.profileWrapperLeftContentTitle}>
                        ARBEIDSERFARING
                      </Text>
                      <Text
                        style={styles.profileWrapperLeftContentTitleLine}
                      ></Text>
                      {experianceData?.map((item) => (
                        <View style={styles.profileLeftContent}>
                          <Text style={styles.profileLeftContentText}>
                            {item?.jobTitle + ' - ' + item?.employer}
                          </Text>

                          <View style={styles.profileLeftContent}>
                            <Text style={styles.profileLeftContentDate}>
                              {item.startDate.length === 0
                                ? 'Startdato -'
                                : moment(item?.startDate).format('YYYY MM') +
                                  ' -  '}{' '}
                              {item.toggle
                                ? 'dags dato'
                                : item.endDate.length === 0
                                ? ' Sluttdato'
                                : moment(item?.endDate).format('YYYY-MM')}
                            </Text>
                          </View>

                          <View style={styles.profileLeftPara}>
                            <Text style={styles.profileLeftParaText}>
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>

                    <View style={styles.experienceSection}>
                      <Text style={styles.profileWrapperLeftContentTitle}>
                        UTDANNING
                      </Text>
                      <Text
                        style={styles.profileWrapperLeftContentTitleLine}
                      ></Text>
                      {educationData?.map((item) => (
                        <View style={styles.profileLeftContent}>
                          <Text style={styles.profileLeftContentText}>
                            {item?.study + ' - ' + item?.school}
                          </Text>

                          <View style={styles.profileLeftContent}>
                            <Text style={styles.profileLeftContentDate}>
                              {item.startDate.length === 0
                                ? 'Startdato -'
                                : moment(item?.startDate).format('YYYY MM') +
                                  ' - '}
                              {item.toggle
                                ? 'dags dato'
                                : item.endDate.length === 0
                                ? ' Sluttdato'
                                : moment(item?.endDate).format('YYYY-MM')}
                            </Text>
                          </View>

                          <View style={styles.profileLeftPara}>
                            <Text style={styles.profileLeftParaText}>
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>

                    {accordiansEnabled.Praksisplasser === true ? (
                      <View style={styles.experienceSection}>
                        <Text style={styles.profileWrapperLeftContentTitle}>
                          PRAKSISPLASSER
                        </Text>
                        <Text
                          style={styles.profileWrapperLeftContentTitleLine}
                        ></Text>
                        {internships?.map((item, index) => (
                          <View style={styles.profileLeftContent} key={index}>
                            <Text style={styles.profileLeftContentText}>
                              {item?.jobTitle} - {item?.employer}
                            </Text>

                            <View style={styles.profileLeftContent}>
                              <Text style={styles.profileLeftContentDate}>
                                {moment(item?.startDate).format('YYYY MM') +
                                  ' - '}{' '}
                                {item.toggle
                                  ? 'dags dato'
                                  : item.endDate.length === 0
                                  ? ' Sluttdato'
                                  : moment(item?.endDate).format('YYYY-MM')}
                              </Text>
                            </View>

                            <View style={styles.profileLeftPara}>
                              <Text style={styles.profileLeftParaText}>
                                {item.additionalInformation.replace(
                                  /(<([^>]+)>)/gi,
                                  ''
                                )}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    ) : null}

                    {accordiansEnabled.Referanser === true ? (
                      <View style={styles.experienceSection}>
                        <Text style={styles.profileWrapperLeftContentTitle}>
                          REFERANSER
                        </Text>
                        <Text
                          style={styles.profileWrapperLeftContentTitleLine}
                        ></Text>

                        {newToggleData ? (
                          <Text style={styles.referenceSectionText}>
                            Oppgis ved forespørsel
                          </Text>
                        ) : (
                          <>
                            {refrence?.map((item) => (
                              <View style={styles.referenceSection}>
                                <Text style={styles.referenceSectionText}>
                                  {item?.name + ' , ' + item?.companyName}
                                </Text>
                                <Text style={styles.referenceSectionText}>
                                  {item?.email}
                                </Text>
                              </View>
                            ))}
                          </>
                        )}
                      </View>
                    ) : null}
                  </View>
                </View>
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
                  <View style={styles.container}>
                    <View style={styles.header}>
                      <Text style={styles.headerTitle}>
                        {cvData?.firstName + ' ' + cvData?.lastName}
                      </Text>
                      <Text style={styles.headerSubtitle}>
                        {cvData.jobTitle}
                      </Text>
                    </View>

                    <View style={styles.containerWrapper}>
                      <View style={styles.containerWrapperLeft}>
                        <View style={styles.containerWrapperLeftContent}>
                          <Text style={styles.containerWrapperLeftContentTitle}>
                            DETALJER
                          </Text>
                          <Text
                            style={styles.containerWrapperLeftContentTitleLine}
                          ></Text>
                          {cvData.physicalAddress === '' ? null : (
                            <View
                              style={styles.containerWrapperLeftContentSubtitle}
                            >
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleHeading
                                }
                              >
                                Adresse
                              </Text>
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleText
                                }
                              >
                                {cvData?.physicalAddress}
                              </Text>
                            </View>
                          )}

                          {cvData.phone === '' ? null : (
                            <View
                              style={styles.containerWrapperLeftContentSubtitle}
                            >
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleHeading
                                }
                              >
                                TELEFON
                              </Text>
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleText
                                }
                              >
                                {cvData?.phone}
                              </Text>
                            </View>
                          )}

                          {cvData?.email === '' ? null : (
                            <View
                              style={styles.containerWrapperLeftContentSubtitle}
                            >
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleHeading
                                }
                              >
                                E-POST
                              </Text>
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleText
                                }
                              >
                                {cvData?.email}
                              </Text>
                            </View>
                          )}

                          {cvData.DOB === '' ? null : (
                            <View
                              style={styles.containerWrapperLeftContentSubtitle}
                            >
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleHeading
                                }
                              >
                                FØDSELSDATO
                              </Text>
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleText
                                }
                              >
                                {moment(cvData?.DOB).format('DD,MM,YYYY')}
                              </Text>
                            </View>
                          )}

                          {cvData.country === '' ? null : (
                            <View
                              style={styles.containerWrapperLeftContentSubtitle}
                            >
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleHeading
                                }
                              >
                                BY
                              </Text>
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleText
                                }
                              >
                                {cvData?.country}
                              </Text>
                            </View>
                          )}

                          {cvData.zipCode === '' ? null : (
                            <View
                              style={styles.containerWrapperLeftContentSubtitle}
                            >
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleHeading
                                }
                              >
                                POST KODE
                              </Text>
                              <Text
                                style={
                                  styles.containerWrapperLeftContentSubtitleText
                                }
                              >
                                {cvData?.zipCode}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View style={styles.progressWrapper}>
                          <Text style={styles.containerWrapperLeftContentTitle}>
                            FERDIGHETER
                          </Text>
                          <Text
                            style={styles.containerWrapperLeftContentTitleLine}
                          ></Text>
                          {skillData?.map((item, index) =>
                            cvData.displayProgressBar === true ? (
                              <View>
                                <Text
                                  style={{
                                    fontSize: '10px',
                                    fontFamily: 'Roboto',
                                    fontWeight: 600,
                                    marginTop: '5px',
                                    width: '80%',
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
                                    borderBottom: '2px dotted black',
                                  }}
                                ></View>
                              </View>
                            ) : (
                              <Text style={styles.progressWrapperText}>
                                {item?.name}
                              </Text>
                            )
                          )}
                        </View>

                        <View style={styles.progressWrapper}>
                          <Text style={styles.containerWrapperLeftContentTitle}>
                            ANNET
                          </Text>
                          <Text
                            style={styles.containerWrapperLeftContentTitleLine}
                          ></Text>
                          <View style={styles.otherSection}>
                            <Text style={styles.otherSectionTitle}>Språk</Text>
                            {lanuages?.map((item, index) => (
                              <Text style={styles.otherSectionPara} key={index}>
                                {item.name} {item?.value}
                              </Text>
                            ))}

                            {accordiansEnabled.Hobbyer === true ? (
                              <>
                                <Text style={styles.otherSectionTitle}>
                                  Hobby
                                </Text>
                                {hobbies?.map((item, index) => (
                                  <Text
                                    style={styles.otherSectionPara}
                                    key={index}
                                  >
                                    {index === hobbies.length - 1
                                      ? item.name + '.'
                                      : item.name + ', '}
                                  </Text>
                                ))}
                              </>
                            ) : null}

                            {accordiansEnabled.Kurs === true ? (
                              <>
                                <Text style={styles.otherSectionTitle}>
                                  Kurs
                                </Text>
                                {courses?.map((item, index) => (
                                  <Text
                                    style={styles.otherSectionPara}
                                    key={index}
                                  >
                                    {item.name}
                                  </Text>
                                ))}
                              </>
                            ) : null}
                          </View>
                        </View>
                      </View>

                      <View style={styles.containerWrapperRight}>
                        {profileData !== '' ? (
                          <View style={styles.profileSection}>
                            <Text style={styles.profileWrapperLeftContentTitle}>
                              PROFIL
                            </Text>
                            <Text
                              style={styles.profileWrapperLeftContentTitleLine}
                            ></Text>

                            <View style={styles.profileSectionPara}>
                              <Text style={styles.profileSectionParaText}>
                                {profileData.replace(/(<([^>]+)>)/gi, '')}
                              </Text>
                            </View>
                          </View>
                        ) : null}

                        <View style={styles.experienceSection}>
                          <Text style={styles.profileWrapperLeftContentTitle}>
                            ARBEIDSERFARING
                          </Text>
                          <Text
                            style={styles.profileWrapperLeftContentTitleLine}
                          ></Text>
                          {experianceData?.map((item) => (
                            <View style={styles.profileLeftContent}>
                              <Text style={styles.profileLeftContentText}>
                                {item?.jobTitle + ' - ' + item?.employer}
                              </Text>

                              <View style={styles.profileLeftContent}>
                                <Text style={styles.profileLeftContentDate}>
                                  {item.startDate.length === 0
                                    ? 'Startdato -'
                                    : moment(item?.startDate).format(
                                        'YYYY MM'
                                      ) + ' -  '}{' '}
                                  {item.toggle
                                    ? 'dags dato'
                                    : item.endDate.length === 0
                                    ? ' Sluttdato'
                                    : moment(item?.endDate).format('YYYY-MM')}
                                </Text>
                              </View>

                              <View style={styles.profileLeftPara}>
                                <Text style={styles.profileLeftParaText}>
                                  {item.additionalInformation.replace(
                                    /(<([^>]+)>)/gi,
                                    ''
                                  )}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>

                        <View style={styles.experienceSection}>
                          <Text style={styles.profileWrapperLeftContentTitle}>
                            UTDANNING
                          </Text>
                          <Text
                            style={styles.profileWrapperLeftContentTitleLine}
                          ></Text>
                          {educationData?.map((item) => (
                            <View style={styles.profileLeftContent}>
                              <Text style={styles.profileLeftContentText}>
                                {item?.study + ' - ' + item?.school}
                              </Text>

                              <View style={styles.profileLeftContent}>
                                <Text style={styles.profileLeftContentDate}>
                                  {item.startDate.length === 0
                                    ? 'Startdato -'
                                    : moment(item?.startDate).format(
                                        'YYYY MM'
                                      ) + ' - '}
                                  {item.toggle
                                    ? 'dags dato'
                                    : item.endDate.length === 0
                                    ? ' Sluttdato'
                                    : moment(item?.endDate).format('YYYY-MM')}
                                </Text>
                              </View>

                              <View style={styles.profileLeftPara}>
                                <Text style={styles.profileLeftParaText}>
                                  {item.additionalInformation.replace(
                                    /(<([^>]+)>)/gi,
                                    ''
                                  )}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>

                        {accordiansEnabled.Praksisplasser === true ? (
                          <View style={styles.experienceSection}>
                            <Text style={styles.profileWrapperLeftContentTitle}>
                              PRAKSISPLASSER
                            </Text>
                            <Text
                              style={styles.profileWrapperLeftContentTitleLine}
                            ></Text>
                            {internships?.map((item, index) => (
                              <View
                                style={styles.profileLeftContent}
                                key={index}
                              >
                                <Text style={styles.profileLeftContentText}>
                                  {item?.jobTitle} - {item?.employer}
                                </Text>

                                <View style={styles.profileLeftContent}>
                                  <Text style={styles.profileLeftContentDate}>
                                    {moment(item?.startDate).format('YYYY MM') +
                                      ' - '}{' '}
                                    {item.toggle
                                      ? 'dags dato'
                                      : item.endDate.length === 0
                                      ? ' Sluttdato'
                                      : moment(item?.endDate).format('YYYY-MM')}
                                  </Text>
                                </View>

                                <View style={styles.profileLeftPara}>
                                  <Text style={styles.profileLeftParaText}>
                                    {item.additionalInformation.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        ) : null}

                        {accordiansEnabled.Referanser === true ? (
                          <View style={styles.experienceSection}>
                            <Text style={styles.profileWrapperLeftContentTitle}>
                              REFERANSER
                            </Text>
                            <Text
                              style={styles.profileWrapperLeftContentTitleLine}
                            ></Text>

                            {newToggleData ? (
                              <Text style={styles.referenceSectionText}>
                                Oppgis ved forespørsel
                              </Text>
                            ) : (
                              <>
                                {refrence?.map((item) => (
                                  <View style={styles.referenceSection}>
                                    <Text style={styles.referenceSectionText}>
                                      {item?.name + ' , ' + item?.companyName}
                                    </Text>
                                    <Text style={styles.referenceSectionText}>
                                      {item?.email}
                                    </Text>
                                  </View>
                                ))}
                              </>
                            )}
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </Page>
              </Document>
            }
            fileName={`Skriv inn CV-navn.pdf`}
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
                    <View style={styles.container}>
                      <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                          {cvData?.firstName + ' ' + cvData?.lastName}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                          {cvData.jobTitle}
                        </Text>
                      </View>

                      <View style={styles.containerWrapper}>
                        <View style={styles.containerWrapperLeft}>
                          <View style={styles.containerWrapperLeftContent}>
                            <Text
                              style={styles.containerWrapperLeftContentTitle}
                            >
                              DETALJER
                            </Text>
                            <Text
                              style={
                                styles.containerWrapperLeftContentTitleLine
                              }
                            ></Text>
                            {cvData.physicalAddress === '' ? null : (
                              <View
                                style={
                                  styles.containerWrapperLeftContentSubtitle
                                }
                              >
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleHeading
                                  }
                                >
                                  Adresse
                                </Text>
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleText
                                  }
                                >
                                  {cvData?.physicalAddress}
                                </Text>
                              </View>
                            )}

                            {cvData.phone === '' ? null : (
                              <View
                                style={
                                  styles.containerWrapperLeftContentSubtitle
                                }
                              >
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleHeading
                                  }
                                >
                                  TELEFON
                                </Text>
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleText
                                  }
                                >
                                  {cvData?.phone}
                                </Text>
                              </View>
                            )}

                            {cvData?.email === '' ? null : (
                              <View
                                style={
                                  styles.containerWrapperLeftContentSubtitle
                                }
                              >
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleHeading
                                  }
                                >
                                  E-POST
                                </Text>
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleText
                                  }
                                >
                                  {cvData?.email}
                                </Text>
                              </View>
                            )}

                            {cvData.DOB === '' ? null : (
                              <View
                                style={
                                  styles.containerWrapperLeftContentSubtitle
                                }
                              >
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleHeading
                                  }
                                >
                                  FØDSELSDATO
                                </Text>
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleText
                                  }
                                >
                                  {moment(cvData?.DOB).format('DD,MM,YYYY')}
                                </Text>
                              </View>
                            )}

                            {cvData.country === '' ? null : (
                              <View
                                style={
                                  styles.containerWrapperLeftContentSubtitle
                                }
                              >
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleHeading
                                  }
                                >
                                  BY
                                </Text>
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleText
                                  }
                                >
                                  {cvData?.country}
                                </Text>
                              </View>
                            )}

                            {cvData.zipCode === '' ? null : (
                              <View
                                style={
                                  styles.containerWrapperLeftContentSubtitle
                                }
                              >
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleHeading
                                  }
                                >
                                  POST KODE
                                </Text>
                                <Text
                                  style={
                                    styles.containerWrapperLeftContentSubtitleText
                                  }
                                >
                                  {cvData?.zipCode}
                                </Text>
                              </View>
                            )}
                          </View>

                          <View style={styles.progressWrapper}>
                            <Text
                              style={styles.containerWrapperLeftContentTitle}
                            >
                              FERDIGHETER
                            </Text>
                            <Text
                              style={
                                styles.containerWrapperLeftContentTitleLine
                              }
                            ></Text>
                            {skillData?.map((item, index) =>
                              cvData.displayProgressBar === true ? (
                                <View>
                                  <Text
                                    style={{
                                      fontSize: '10px',
                                      fontFamily: 'Roboto',
                                      fontWeight: 600,
                                      marginTop: '5px',
                                      width: '80%',
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
                                      borderBottom: '2px dotted black',
                                    }}
                                  ></View>
                                </View>
                              ) : (
                                <Text style={styles.progressWrapperText}>
                                  {item?.name}
                                </Text>
                              )
                            )}
                          </View>

                          <View style={styles.progressWrapper}>
                            <Text
                              style={styles.containerWrapperLeftContentTitle}
                            >
                              ANNET
                            </Text>
                            <Text
                              style={
                                styles.containerWrapperLeftContentTitleLine
                              }
                            ></Text>
                            <View style={styles.otherSection}>
                              <Text style={styles.otherSectionTitle}>
                                Språk
                              </Text>
                              {lanuages?.map((item, index) => (
                                <Text
                                  style={styles.otherSectionPara}
                                  key={index}
                                >
                                  {item.name} {item?.value}
                                </Text>
                              ))}

                              {accordiansEnabled.Hobbyer === true ? (
                                <>
                                  <Text style={styles.otherSectionTitle}>
                                    Hobby
                                  </Text>
                                  {hobbies?.map((item, index) => (
                                    <Text
                                      style={styles.otherSectionPara}
                                      key={index}
                                    >
                                      {index === hobbies.length - 1
                                        ? item.name + '.'
                                        : item.name + ', '}
                                    </Text>
                                  ))}
                                </>
                              ) : null}

                              {accordiansEnabled.Kurs === true ? (
                                <>
                                  <Text style={styles.otherSectionTitle}>
                                    Kurs
                                  </Text>
                                  {courses?.map((item, index) => (
                                    <Text
                                      style={styles.otherSectionPara}
                                      key={index}
                                    >
                                      {item.name}
                                    </Text>
                                  ))}
                                </>
                              ) : null}
                            </View>
                          </View>
                        </View>

                        <View style={styles.containerWrapperRight}>
                          {profileData !== '' ? (
                            <View style={styles.profileSection}>
                              <Text
                                style={styles.profileWrapperLeftContentTitle}
                              >
                                PROFIL
                              </Text>
                              <Text
                                style={
                                  styles.profileWrapperLeftContentTitleLine
                                }
                              ></Text>

                              <View style={styles.profileSectionPara}>
                                <Text style={styles.profileSectionParaText}>
                                  {profileData.replace(/(<([^>]+)>)/gi, '')}
                                </Text>
                              </View>
                            </View>
                          ) : null}

                          <View style={styles.experienceSection}>
                            <Text style={styles.profileWrapperLeftContentTitle}>
                              ARBEIDSERFARING
                            </Text>
                            <Text
                              style={styles.profileWrapperLeftContentTitleLine}
                            ></Text>
                            {experianceData?.map((item) => (
                              <View style={styles.profileLeftContent}>
                                <Text style={styles.profileLeftContentText}>
                                  {item?.jobTitle + ' - ' + item?.employer}
                                </Text>

                                <View style={styles.profileLeftContent}>
                                  <Text style={styles.profileLeftContentDate}>
                                    {item.startDate.length === 0
                                      ? 'Startdato -'
                                      : moment(item?.startDate).format(
                                          'YYYY MM'
                                        ) + ' -  '}{' '}
                                    {item.toggle
                                      ? 'dags dato'
                                      : item.endDate.length === 0
                                      ? ' Sluttdato'
                                      : moment(item?.endDate).format('YYYY-MM')}
                                  </Text>
                                </View>

                                <View style={styles.profileLeftPara}>
                                  <Text style={styles.profileLeftParaText}>
                                    {item.additionalInformation.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>

                          <View style={styles.experienceSection}>
                            <Text style={styles.profileWrapperLeftContentTitle}>
                              UTDANNING
                            </Text>
                            <Text
                              style={styles.profileWrapperLeftContentTitleLine}
                            ></Text>
                            {educationData?.map((item) => (
                              <View style={styles.profileLeftContent}>
                                <Text style={styles.profileLeftContentText}>
                                  {item?.study + ' - ' + item?.school}
                                </Text>

                                <View style={styles.profileLeftContent}>
                                  <Text style={styles.profileLeftContentDate}>
                                    {item.startDate.length === 0
                                      ? 'Startdato -'
                                      : moment(item?.startDate).format(
                                          'YYYY MM'
                                        ) + ' - '}
                                    {item.toggle
                                      ? 'dags dato'
                                      : item.endDate.length === 0
                                      ? ' Sluttdato'
                                      : moment(item?.endDate).format('YYYY-MM')}
                                  </Text>
                                </View>

                                <View style={styles.profileLeftPara}>
                                  <Text style={styles.profileLeftParaText}>
                                    {item.additionalInformation.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>

                          {accordiansEnabled.Praksisplasser === true ? (
                            <View style={styles.experienceSection}>
                              <Text
                                style={styles.profileWrapperLeftContentTitle}
                              >
                                PRAKSISPLASSER
                              </Text>
                              <Text
                                style={
                                  styles.profileWrapperLeftContentTitleLine
                                }
                              ></Text>
                              {internships?.map((item, index) => (
                                <View
                                  style={styles.profileLeftContent}
                                  key={index}
                                >
                                  <Text style={styles.profileLeftContentText}>
                                    {item?.jobTitle} - {item?.employer}
                                  </Text>

                                  <View style={styles.profileLeftContent}>
                                    <Text style={styles.profileLeftContentDate}>
                                      {moment(item?.startDate).format(
                                        'YYYY MM'
                                      ) + ' - '}{' '}
                                      {item.toggle
                                        ? 'dags dato'
                                        : item.endDate.length === 0
                                        ? ' Sluttdato'
                                        : moment(item?.endDate).format(
                                            'YYYY-MM'
                                          )}
                                    </Text>
                                  </View>

                                  <View style={styles.profileLeftPara}>
                                    <Text style={styles.profileLeftParaText}>
                                      {item.additionalInformation.replace(
                                        /(<([^>]+)>)/gi,
                                        ''
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </View>
                          ) : null}

                          {accordiansEnabled.Referanser === true ? (
                            <View style={styles.experienceSection}>
                              <Text
                                style={styles.profileWrapperLeftContentTitle}
                              >
                                REFERANSER
                              </Text>
                              <Text
                                style={
                                  styles.profileWrapperLeftContentTitleLine
                                }
                              ></Text>

                              {newToggleData ? (
                                <Text style={styles.referenceSectionText}>
                                  Oppgis ved forespørsel
                                </Text>
                              ) : (
                                <>
                                  {refrence?.map((item) => (
                                    <View style={styles.referenceSection}>
                                      <Text style={styles.referenceSectionText}>
                                        {item?.name + ' , ' + item?.companyName}
                                      </Text>
                                      <Text style={styles.referenceSectionText}>
                                        {item?.email}
                                      </Text>
                                    </View>
                                  ))}
                                </>
                              )}
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </View>
                  </Page>
                </Document>
              }
              fileName={`Skriv inn CV-navn.pdf`}
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

export default TemplateThree
