import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext, Link } from 'react-router-dom'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  getAdditionalAccordian,
  getHobbies,
  getInternships,
  getNewRefToggle,
  getRefToggle,
  languageData,
  profileRichTextData,
  propertiesData,
  referenceData,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import ProgressBar from './progressBar'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'
import CalibriRegular from '../../assests/fonts/Calibri-Font/Calibri/Calibri.ttf'
import CalibriBold from '../../assests/fonts/Calibri-Font/Calibri/calibrib.ttf'
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
import axios from 'axios'
import close from '../../../src/assests/images/circle-xmark.png'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const TemplateEleven = () => {
  let pdfComponent = useRef()
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const toggleData = useSelector(getRefToggle)
  const newToggleData = useSelector(getNewRefToggle)
  const [changeOccured, setChangeOccured] = useState(false)
  const courses = useSelector(coursesData)
  // const profileData = useSelector(profileRichTextData);
  let printButtonRef = useRef()
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  const [isChecked, setIsChecked] = useState(false)
  const properties = useSelector(propertiesData)
  const languages = useSelector(languageData)
  const refrence = useSelector(referenceData)
  const enabledAccordians = useSelector(getAdditionalAccordian)
  const hobbies = useSelector(getHobbies)
  const internships = useSelector(getInternships)
  const profileData = useSelector(profileRichTextData)
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

  const Proceed = () => {
    return (
      <button className='proceed-button' onClick={() => handleModalOpen()}>
        <MdArrowForwardIos />
      </button>
    )
  }

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
    heder: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      paddingTop: 0,
      width: '100%',
    },
    hederLeftBox: {
      backgroundColor: '#ed7d31',
      height: 85,
      width: '6%',
      marginTop: -10,
    },
    hederRight: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      paddingHorizontal: 5,
      // paddingVertical: 5,
      marginBottom: 5,
      width: '90%',
    },
    hederRightTitle: {
      overflowWrap: 'break-word',
      fontFamily: 'Calibri',
      letterSpacing: 3,
      fontSize: 28,
      fontWeight: 600,
      color: 'black',
      wordBreak: 'break-all',
      fontFamily: 'Calibri',
    },
    hederRightSubtitle: {
      fontFamily: 'Calibri',
      fontWeight: 'bold',
      overflowWrap: 'break-word',
      marginTop: -5,
    },
    hederRightContent: {
      display: 'flex',
      flexDirection: 'row',
      fontFamily: 'Calibri',
      fontSize: 11,
      fontWeight: 500,
      wordBreak: 'break-all',
      marginTop: -5,
    },
    contentSection: {
      alignItems: 'center',
      display: 'flex',
      // flexDirection: 'column',
      justifyContent: 'center',
      // textAlign: 'center',
      width: '100%',
      marginHorizontal: 35,
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      // paddingRight: 8,
      // paddingTop: 8,
      width: '100%',
    },
    contentContainerHeading: {
      fontFamily: 'Calibri',
      fontSize: 15,
      fontWeight: 600,
      position: 'relative',
      wordBreak: 'break-all',
    },
    contentContainerHeadingLine: {
      border: '2px solid #ed7d31',
      top: 18,
      height: 4,
      left: 0,
      position: 'absolute',
      width: '7%',
    },
    contentContainerPara: {
      borderBottom: '1px solid black',
      paddingBottom: 5,
      width: '88%',
    },
    contentContainerParaText: {
      fontFamily: 'Calibri',
      fontSize: 10,
      paddingBottom: 4,
      wordBreak: 'break-all',
    },
    experienceSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      width: '100%',
      paddingTop: 12,
    },
    educationContainerHeadingLine: {
      border: '2px solid #ed7d31',
      top: 30,
      height: 4,
      left: 0,
      position: 'absolute',
      width: '7%',
    },
    educationContainerHeadingPara: {
      fontFamily: 'Calibri',
      fontSize: 10,
      fontWeight: 'bold',
      wordBreak: 'break-all',
    },
    educationContainerDate: {
      display: 'flex',
      alignCtems: 'center',
      flexDirection: 'row',
    },
    educationContainerDateText: {
      fontFamily: 'Calibri',
      fontSize: 11,
    },
    educationContainerPara: {
      borderBottom: '1px solid black',
      paddingBottom: 8,
      width: '88%',
    },
    educationContainerParaText: {
      color: 'black',
      fontFamily: 'Calibri',
      fontSize: 10,
    },
    contentSectionBottom: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      // marginTop: 4,
    },
    contentSectionBottomLeft: {
      width: '70%',
    },
    contentSectionBottomLeftContent: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 8,
      width: '100%',
    },
    contentSectionBottomLeftContentSide: {
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
      paddingTop: 20,
      width: '100%',
    },
    contentSectionBottomLeftContentSideTitle: {
      fontFamily: 'Calibri',
      fontSize: 13,
      fontWeight: 600,
      paddingBottom: 5,
      position: 'relative',
      textTransform: 'uppercase',
      width: '30%',
      wordBreak: 'break-all',
    },
    contentSectionBottomLeftContentSideSetting: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Calibri',
      fontSize: 10,
      gap: 10,
      width: '100%',
      wordBreak: 'break-all',
    },
    contentSectionBottomLeftContentSideProgress: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%',
      wordBreak: 'break-all',
    },
    contentSectionBottomLeftContentSideProgressText: {
      fontFamily: 'Calibri',
      fontSize: 10,
      wordBreak: 'break-all',
      width: 200,
      // fontWeight: 700,
    },
    contentSectionBottomRight: {
      paddingLeft: 12,
      width: '30%',
      borderLeft: '1px solid grey',
      fontFamily: 'Calibri',
      wordBreak: 'break-all',
      height: '100%',
    },
    studingContent: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    settingContent: {
      fontFamily: 'Calibri',
      gap: 10,
      width: '60%',
      wordBreak: 'break-all',
      fontSize: 10,
      fontFamily: 'Calibri',
      fontWeight: 'bold',
    },
    settingContentText: {
      fontSize: 10,
      fontFamily: 'Calibri',
      fontWeight: 'bold',
      wordBreak: 'break-all',
      width: '100%',
    },
    contentContainerHeadingLineTwo: {
      border: '2px solid #ed7d31',
      top: 25,
      height: 4,
      left: 0,
      position: 'absolute',
      width: '8%',
    },
  })

  return (
    <>
      {showButton && <Proceed />}
      {showPDFViewer ? (
        <PDFViewer style={styles.document} showToolbar={false}>
          <Document style={styles.document}>
            <Page size='A4' style={styles.page}>
              <View style={styles.container}>
                <View style={styles.heder}>
                  <View style={styles.hederLeftBox}></View>
                  <View style={styles.hederRight}>
                    <Text style={styles.hederRightTitle}>
                      {cvData?.firstName}
                      <Text style={{ color: 'gray' }}>{cvData?.lastName}</Text>
                    </Text>
                    <Text style={styles.hederRightSubtitle}>
                      {cvData?.jobTitle}
                    </Text>
                    <View style={styles.hederRightContent}>
                      <Text style={{ wordBreak: 'break-all' }}>
                        <Text>Epost: </Text>
                        <Text
                          style={{
                            fontWeight: 'light',
                            color: 'black',
                            wordBreak: 'break-all',
                            fontSize: 10,
                          }}
                        >
                          {cvData?.email} /{' '}
                        </Text>
                        {cvData?.phone === '' ? null : (
                          <>
                            <Text>Tlf: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                wordBreak: 'break-all',
                                color: 'black',
                                fontSize: 10,
                              }}
                            >
                              {cvData?.phone} /{' '}
                            </Text>
                          </>
                        )}
                        {cvData?.physicalAddress === '' ? null : (
                          <>
                            <Text> Adresse: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                color: 'black',
                                fontSize: 10,
                                wordBreak: 'break-all',
                              }}
                            >
                              {cvData?.physicalAddress}
                            </Text>
                          </>
                        )}
                        {cvData?.zipCode === '' ? null : (
                          <Text
                            style={{
                              fontWeight: 'light',
                              color: 'black',
                              fontSize: 10,
                              wordBreak: 'break-all',
                            }}
                          >
                            {',' + cvData?.zipCode} /{' '}
                          </Text>
                        )}

                        {cvData?.DOB === '' ? null : (
                          <>
                            <Text> Fødselsdato: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                color: 'black',
                                fontSize: 10,
                                wordBreak: 'break-all',
                              }}
                            >
                              {moment(cvData?.DOB).format('DD,MM,YYYY')}
                            </Text>
                          </>
                        )}
                        {cvData?.drivingLicense === '' ? null : (
                          <>
                            <Text> Førerkort: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                color: 'black',
                                fontSize: 10,
                                wordBreak: 'break-all',
                              }}
                            >
                              {cvData?.drivingLicense} /{' '}
                            </Text>
                          </>
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.contentSection}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.contentContainerHeading}>OM MEG</Text>
                    <Text style={styles.contentContainerHeadingLine}></Text>
                    <View style={styles.contentContainerPara}>
                      <Text style={styles.contentContainerParaText}>
                        {profileData.replace(/(<([^>]+)>)/gi, '')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.experienceSection}>
                    <Text style={styles.contentContainerHeading}>
                      ARBEIDSERFARING
                    </Text>
                    {experianceData?.map((item, index) => {
                      return (
                        <>
                          <Text
                            style={styles.educationContainerHeadingLine}
                          ></Text>
                          <Text style={styles.educationContainerHeadingPara}>
                            {item?.jobTitle} | {item?.employer}
                          </Text>
                          <View style={styles.educationContainerDate}>
                            <Text style={styles.educationContainerDateText}>
                              {item?.startDate} -{' '}
                              {item.toggle ? 'dags dato' : item?.endDate}
                            </Text>
                          </View>

                          <View style={styles.educationContainerPara}>
                            <Text style={styles.educationContainerParaText}>
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </>
                      )
                    })}
                  </View>

                  {enabledAccordians.Praksisplasser === true ? (
                    <View style={styles.experienceSection}>
                      <Text style={styles.contentContainerHeading}>
                        Praksisplasser
                      </Text>
                      {internships?.map((item, index) => {
                        return (
                          <>
                            <Text
                              style={styles.educationContainerHeadingLine}
                            ></Text>
                            <Text style={styles.educationContainerHeadingPara}>
                              {item?.jobTitle} | {item?.employer}
                            </Text>
                            <View style={styles.educationContainerDate}>
                              <Text style={styles.educationContainerDateText}>
                                {item?.startDate} -{' '}
                                {item.toggle ? 'dags dato' : item?.endDate}
                              </Text>
                            </View>

                            <View style={styles.educationContainerPara}>
                              <Text style={styles.educationContainerParaText}>
                                {item.additionalInformation.replace(
                                  /(<([^>]+)>)/gi,
                                  ''
                                )}
                              </Text>
                            </View>
                          </>
                        )
                      })}
                    </View>
                  ) : null}

                  <View style={styles.contentSectionBottom}>
                    <View style={styles.contentSectionBottomLeft}>
                      <View style={styles.contentSectionBottomLeftContent}>
                        <Text style={styles.contentContainerHeading}>
                          PROFESJONELL EKSPERTISE
                        </Text>
                        <Text
                          style={styles.contentContainerHeadingLineTwo}
                        ></Text>

                        <View
                          style={styles.contentSectionBottomLeftContentSide}
                        >
                          <Text
                            style={
                              styles.contentSectionBottomLeftContentSideTitle
                            }
                          >
                            ferdigheter
                          </Text>

                          <View
                            style={
                              styles.contentSectionBottomLeftContentSideProgress
                            }
                          >
                            {properties?.map((item) => (
                              <View
                                style={
                                  styles.contentSectionBottomLeftContentSideSetting
                                }
                              >
                                {cvData?.displayProgressBar === true ? (
                                  <View>
                                    <Text
                                      style={
                                        styles.contentSectionBottomLeftContentSideProgressText
                                      }
                                    >
                                      {item?.name}
                                    </Text>
                                    <View
                                      style={{
                                        backgroundColor: 'grey',
                                        height: '5px',
                                        maxWidth: '95%',
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: `${item?.value}%`,
                                          color: 'grey',
                                          backgroundColor: 'rgb(237, 125, 49)',
                                          height: '5px',
                                        }}
                                      ></View>
                                    </View>
                                  </View>
                                ) : (
                                  <Text
                                    style={
                                      styles.contentSectionBottomLeftContentSideProgressText
                                    }
                                  >
                                    {item?.name}
                                  </Text>
                                )}
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>

                      <View style={styles.contentSectionBottomLeftContent}>
                        <Text style={styles.contentContainerHeading}>
                          ANNET
                        </Text>
                        <Text
                          style={styles.contentContainerHeadingLineTwo}
                        ></Text>
                        <View
                          style={styles.contentSectionBottomLeftContentSide}
                        >
                          <Text
                            style={
                              styles.contentSectionBottomLeftContentSideTitle
                            }
                          >
                            SPRÅK
                          </Text>
                          <View
                            style={
                              styles.contentSectionBottomLeftContentSideSetting
                            }
                          >
                            {languages?.map((item) => (
                              // <View
                              //   style={
                              //     styles.contentSectionBottomLeftContentSideProgress
                              //   }
                              // >
                              <Text
                                style={
                                  styles.contentSectionBottomLeftContentSideProgressText
                                }
                              >
                                {item?.name} {item?.value}
                              </Text>
                              // </View>
                            ))}
                          </View>
                        </View>

                        {enabledAccordians.Kurs === true ? (
                          <View
                            style={styles.contentSectionBottomLeftContentSide}
                          >
                            <Text
                              style={
                                styles.contentSectionBottomLeftContentSideTitle
                              }
                            >
                              KURS
                            </Text>
                            <View
                              style={
                                styles.contentSectionBottomLeftContentSideSetting
                              }
                            >
                              {courses?.map((item) => (
                                // <View
                                //   style={
                                //     styles.contentSectionBottomLeftContentSideProgress
                                //   }
                                // >
                                <Text
                                  style={
                                    styles.contentSectionBottomLeftContentSideProgressText
                                  }
                                >
                                  {item?.name}
                                </Text>
                                // </View>
                              ))}
                            </View>
                          </View>
                        ) : null}

                        {enabledAccordians.Hobbyer === true ? (
                          <View
                            style={styles.contentSectionBottomLeftContentSide}
                          >
                            <Text
                              style={
                                styles.contentSectionBottomLeftContentSideTitle
                              }
                            >
                              HOBBY
                            </Text>
                            <View
                              style={
                                styles.contentSectionBottomLeftContentSideSetting
                              }
                            >
                              <Text>
                                {hobbies?.map((item, index) => (
                                  <Text
                                    style={
                                      styles.contentSectionBottomLeftContentSideProgressText
                                    }
                                  >
                                    {index === hobbies.length - 1
                                      ? item?.name + '.'
                                      : item?.name + ', '}
                                  </Text>
                                ))}
                              </Text>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    </View>

                    <View style={styles.contentSectionBottomRight}>
                      <View style={styles.contentSectionBottomRightContent}>
                        <View style={styles.contentSectionBottomLeftContent}>
                          <Text style={styles.contentContainerHeading}>
                            UTDANNELSE
                          </Text>
                          <Text
                            style={styles.contentContainerHeadingLineTwo}
                          ></Text>

                          <View style={styles.studingContent}>
                            {educationData?.map((item) => (
                              <View style={styles.settingContent}>
                                <Text style={{ textTransform: 'uppercase' }}>
                                  {item?.study}
                                </Text>
                                <Text style={styles.settingContentText}>
                                  {item?.school}
                                </Text>
                                <View style={styles.settingContentDate}>
                                  <Text style={styles.settingContentDateText}>
                                    {item.startDate.length === 0
                                      ? 'Startdato -'
                                      : moment(item?.startDate).format(
                                          'MM YYYY'
                                        ) + ' - '}
                                    {item.endDate.length === 0
                                      ? ' sluttdato'
                                      : moment(item?.endDate).format('MM YYYY')}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>

                        {enabledAccordians.Referanser === true ? (
                          <View style={styles.contentSectionBottomLeftContent}>
                            <Text style={styles.contentContainerHeading}>
                              Referanser
                            </Text>
                            <Text
                              style={styles.contentContainerHeadingLineTwo}
                            ></Text>
                            {newToggleData ? (
                              <Text
                                style={{
                                  marginTop: '8px',
                                  wordBreak: 'break-all',
                                  fontSize: '13px',
                                  fontFamily: 'Calibri',
                                  fontWeight: 'bold',
                                  color: 'black',
                                }}
                              >
                                Oppgis ved forespørsel
                              </Text>
                            ) : (
                              <View style={styles.studingContent}>
                                {refrence?.map((item) => (
                                  <View style={styles.settingContent}>
                                    <Text>
                                      {item?.name + ' - ' + item?.companyName}
                                    </Text>
                                    <Text style={styles.settingContentText}>
                                      {item?.email}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            )}
                          </View>
                        ) : null}
                      </View>
                    </View>
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
                Husk å trykke på 'Oppdater tekst' før du laster ned CV-en din
              </span>
            </span>
          </div>
          <PDFDownloadLink
            document={
              <Document style={styles.document}>
            <Page size='A4' style={styles.page}>
              <View style={styles.container}>
                <View style={styles.heder}>
                  <View style={styles.hederLeftBox}></View>
                  <View style={styles.hederRight}>
                    <Text style={styles.hederRightTitle}>
                      {cvData?.firstName}
                      <Text style={{ color: 'gray' }}>{cvData?.lastName}</Text>
                    </Text>
                    <Text style={styles.hederRightSubtitle}>
                      {cvData?.jobTitle}
                    </Text>
                    <View style={styles.hederRightContent}>
                      <Text style={{ wordBreak: 'break-all' }}>
                        <Text>Epost: </Text>
                        <Text
                          style={{
                            fontWeight: 'light',
                            color: 'black',
                            wordBreak: 'break-all',
                            fontSize: 10,
                          }}
                        >
                          {cvData?.email} /{' '}
                        </Text>
                        {cvData?.phone === '' ? null : (
                          <>
                            <Text>Tlf: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                wordBreak: 'break-all',
                                color: 'black',
                                fontSize: 10,
                              }}
                            >
                              {cvData?.phone} /{' '}
                            </Text>
                          </>
                        )}
                        {cvData?.physicalAddress === '' ? null : (
                          <>
                            <Text> Adresse: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                color: 'black',
                                fontSize: 10,
                                wordBreak: 'break-all',
                              }}
                            >
                              {cvData?.physicalAddress}
                            </Text>
                          </>
                        )}
                        {cvData?.zipCode === '' ? null : (
                          <Text
                            style={{
                              fontWeight: 'light',
                              color: 'black',
                              fontSize: 10,
                              wordBreak: 'break-all',
                            }}
                          >
                            {',' + cvData?.zipCode} /{' '}
                          </Text>
                        )}

                        {cvData?.DOB === '' ? null : (
                          <>
                            <Text> Fødselsdato: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                color: 'black',
                                fontSize: 10,
                                wordBreak: 'break-all',
                              }}
                            >
                              {moment(cvData?.DOB).format('DD,MM,YYYY')}
                            </Text>
                          </>
                        )}
                        {cvData?.drivingLicense === '' ? null : (
                          <>
                            <Text> Førerkort: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                color: 'black',
                                fontSize: 10,
                                wordBreak: 'break-all',
                              }}
                            >
                              {cvData?.drivingLicense} /{' '}
                            </Text>
                          </>
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.contentSection}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.contentContainerHeading}>OM MEG</Text>
                    <Text style={styles.contentContainerHeadingLine}></Text>
                    <View style={styles.contentContainerPara}>
                      <Text style={styles.contentContainerParaText}>
                        {profileData.replace(/(<([^>]+)>)/gi, '')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.experienceSection}>
                    <Text style={styles.contentContainerHeading}>
                      ARBEIDSERFARING
                    </Text>
                    {experianceData?.map((item, index) => {
                      return (
                        <>
                          <Text
                            style={styles.educationContainerHeadingLine}
                          ></Text>
                          <Text style={styles.educationContainerHeadingPara}>
                            {item?.jobTitle} | {item?.employer}
                          </Text>
                          <View style={styles.educationContainerDate}>
                            <Text style={styles.educationContainerDateText}>
                              {item?.startDate} -{' '}
                              {item.toggle ? 'dags dato' : item?.endDate}
                            </Text>
                          </View>

                          <View style={styles.educationContainerPara}>
                            <Text style={styles.educationContainerParaText}>
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </>
                      )
                    })}
                  </View>

                  {enabledAccordians.Praksisplasser === true ? (
                    <View style={styles.experienceSection}>
                      <Text style={styles.contentContainerHeading}>
                        Praksisplasser
                      </Text>
                      {internships?.map((item, index) => {
                        return (
                          <>
                            <Text
                              style={styles.educationContainerHeadingLine}
                            ></Text>
                            <Text style={styles.educationContainerHeadingPara}>
                              {item?.jobTitle} | {item?.employer}
                            </Text>
                            <View style={styles.educationContainerDate}>
                              <Text style={styles.educationContainerDateText}>
                                {item?.startDate} -{' '}
                                {item.toggle ? 'dags dato' : item?.endDate}
                              </Text>
                            </View>

                            <View style={styles.educationContainerPara}>
                              <Text style={styles.educationContainerParaText}>
                                {item.additionalInformation.replace(
                                  /(<([^>]+)>)/gi,
                                  ''
                                )}
                              </Text>
                            </View>
                          </>
                        )
                      })}
                    </View>
                  ) : null}

                  <View style={styles.contentSectionBottom}>
                    <View style={styles.contentSectionBottomLeft}>
                      <View style={styles.contentSectionBottomLeftContent}>
                        <Text style={styles.contentContainerHeading}>
                          PROFESJONELL EKSPERTISE
                        </Text>
                        <Text
                          style={styles.contentContainerHeadingLineTwo}
                        ></Text>

                        <View
                          style={styles.contentSectionBottomLeftContentSide}
                        >
                          <Text
                            style={
                              styles.contentSectionBottomLeftContentSideTitle
                            }
                          >
                            ferdigheter
                          </Text>

                          <View
                            style={
                              styles.contentSectionBottomLeftContentSideProgress
                            }
                          >
                            {properties?.map((item) => (
                              <View
                                style={
                                  styles.contentSectionBottomLeftContentSideSetting
                                }
                              >
                                {cvData?.displayProgressBar === true ? (
                                  <View>
                                    <Text
                                      style={
                                        styles.contentSectionBottomLeftContentSideProgressText
                                      }
                                    >
                                      {item?.name}
                                    </Text>
                                    <View
                                      style={{
                                        backgroundColor: 'grey',
                                        height: '5px',
                                        maxWidth: '95%',
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: `${item?.value}%`,
                                          color: 'grey',
                                          backgroundColor: 'rgb(237, 125, 49)',
                                          height: '5px',
                                        }}
                                      ></View>
                                    </View>
                                  </View>
                                ) : (
                                  <Text
                                    style={
                                      styles.contentSectionBottomLeftContentSideProgressText
                                    }
                                  >
                                    {item?.name}
                                  </Text>
                                )}
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>

                      <View style={styles.contentSectionBottomLeftContent}>
                        <Text style={styles.contentContainerHeading}>
                          ANNET
                        </Text>
                        <Text
                          style={styles.contentContainerHeadingLineTwo}
                        ></Text>
                        <View
                          style={styles.contentSectionBottomLeftContentSide}
                        >
                          <Text
                            style={
                              styles.contentSectionBottomLeftContentSideTitle
                            }
                          >
                            SPRÅK
                          </Text>
                          <View
                            style={
                              styles.contentSectionBottomLeftContentSideSetting
                            }
                          >
                            {languages?.map((item) => (
                              // <View
                              //   style={
                              //     styles.contentSectionBottomLeftContentSideProgress
                              //   }
                              // >
                              <Text
                                style={
                                  styles.contentSectionBottomLeftContentSideProgressText
                                }
                              >
                                {item?.name} {item?.value}
                              </Text>
                              // </View>
                            ))}
                          </View>
                        </View>

                        {enabledAccordians.Kurs === true ? (
                          <View
                            style={styles.contentSectionBottomLeftContentSide}
                          >
                            <Text
                              style={
                                styles.contentSectionBottomLeftContentSideTitle
                              }
                            >
                              KURS
                            </Text>
                            <View
                              style={
                                styles.contentSectionBottomLeftContentSideSetting
                              }
                            >
                              {courses?.map((item) => (
                                // <View
                                //   style={
                                //     styles.contentSectionBottomLeftContentSideProgress
                                //   }
                                // >
                                <Text
                                  style={
                                    styles.contentSectionBottomLeftContentSideProgressText
                                  }
                                >
                                  {item?.name}
                                </Text>
                                // </View>
                              ))}
                            </View>
                          </View>
                        ) : null}

                        {enabledAccordians.Hobbyer === true ? (
                          <View
                            style={styles.contentSectionBottomLeftContentSide}
                          >
                            <Text
                              style={
                                styles.contentSectionBottomLeftContentSideTitle
                              }
                            >
                              HOBBY
                            </Text>
                            <View
                              style={
                                styles.contentSectionBottomLeftContentSideSetting
                              }
                            >
                              <Text>
                                {hobbies?.map((item, index) => (
                                  <Text
                                    style={
                                      styles.contentSectionBottomLeftContentSideProgressText
                                    }
                                  >
                                    {index === hobbies.length - 1
                                      ? item?.name + '.'
                                      : item?.name + ', '}
                                  </Text>
                                ))}
                              </Text>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    </View>

                    <View style={styles.contentSectionBottomRight}>
                      <View style={styles.contentSectionBottomRightContent}>
                        <View style={styles.contentSectionBottomLeftContent}>
                          <Text style={styles.contentContainerHeading}>
                            UTDANNELSE
                          </Text>
                          <Text
                            style={styles.contentContainerHeadingLineTwo}
                          ></Text>

                          <View style={styles.studingContent}>
                            {educationData?.map((item) => (
                              <View style={styles.settingContent}>
                                <Text style={{ textTransform: 'uppercase' }}>
                                  {item?.study}
                                </Text>
                                <Text style={styles.settingContentText}>
                                  {item?.school}
                                </Text>
                                <View style={styles.settingContentDate}>
                                  <Text style={styles.settingContentDateText}>
                                    {item.startDate.length === 0
                                      ? 'Startdato -'
                                      : moment(item?.startDate).format(
                                          'MM YYYY'
                                        ) + ' - '}
                                    {item.endDate.length === 0
                                      ? ' sluttdato'
                                      : moment(item?.endDate).format('MM YYYY')}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>

                        {enabledAccordians.Referanser === true ? (
                          <View style={styles.contentSectionBottomLeftContent}>
                            <Text style={styles.contentContainerHeading}>
                              Referanser
                            </Text>
                            <Text
                              style={styles.contentContainerHeadingLineTwo}
                            ></Text>
                            {newToggleData ? (
                              <Text
                                style={{
                                  marginTop: '8px',
                                  wordBreak: 'break-all',
                                  fontSize: '13px',
                                  fontFamily: 'Calibri',
                                  fontWeight: 'bold',
                                  color: 'black',
                                }}
                              >
                                Oppgis ved forespørsel
                              </Text>
                            ) : (
                              <View style={styles.studingContent}>
                                {refrence?.map((item) => (
                                  <View style={styles.settingContent}>
                                    <Text>
                                      {item?.name + ' - ' + item?.companyName}
                                    </Text>
                                    <Text style={styles.settingContentText}>
                                      {item?.email}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            )}
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
            }
            fileName={cvData.saveAs}
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
                    <View style={styles.heder}>
                      <View style={styles.hederLeftBox}></View>
                      <View style={styles.hederRight}>
                        <Text style={styles.hederRightTitle}>
                          {cvData?.firstName}
                          <Text style={{ color: 'gray' }}>{cvData?.lastName}</Text>
                        </Text>
                        <Text style={styles.hederRightSubtitle}>
                          {cvData?.jobTitle}
                        </Text>
                        <View style={styles.hederRightContent}>
                          <Text style={{ wordBreak: 'break-all' }}>
                            <Text>Epost: </Text>
                            <Text
                              style={{
                                fontWeight: 'light',
                                color: 'black',
                                wordBreak: 'break-all',
                                fontSize: 10,
                              }}
                            >
                              {cvData?.email} /{' '}
                            </Text>
                            {cvData?.phone === '' ? null : (
                              <>
                                <Text>Tlf: </Text>
                                <Text
                                  style={{
                                    fontWeight: 'light',
                                    wordBreak: 'break-all',
                                    color: 'black',
                                    fontSize: 10,
                                  }}
                                >
                                  {cvData?.phone} /{' '}
                                </Text>
                              </>
                            )}
                            {cvData?.physicalAddress === '' ? null : (
                              <>
                                <Text> Adresse: </Text>
                                <Text
                                  style={{
                                    fontWeight: 'light',
                                    color: 'black',
                                    fontSize: 10,
                                    wordBreak: 'break-all',
                                  }}
                                >
                                  {cvData?.physicalAddress}
                                </Text>
                              </>
                            )}
                            {cvData?.zipCode === '' ? null : (
                              <Text
                                style={{
                                  fontWeight: 'light',
                                  color: 'black',
                                  fontSize: 10,
                                  wordBreak: 'break-all',
                                }}
                              >
                                {',' + cvData?.zipCode} /{' '}
                              </Text>
                            )}
    
                            {cvData?.DOB === '' ? null : (
                              <>
                                <Text> Fødselsdato: </Text>
                                <Text
                                  style={{
                                    fontWeight: 'light',
                                    color: 'black',
                                    fontSize: 10,
                                    wordBreak: 'break-all',
                                  }}
                                >
                                  {moment(cvData?.DOB).format('DD,MM,YYYY')}
                                </Text>
                              </>
                            )}
                            {cvData?.drivingLicense === '' ? null : (
                              <>
                                <Text> Førerkort: </Text>
                                <Text
                                  style={{
                                    fontWeight: 'light',
                                    color: 'black',
                                    fontSize: 10,
                                    wordBreak: 'break-all',
                                  }}
                                >
                                  {cvData?.drivingLicense} /{' '}
                                </Text>
                              </>
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
    
                    <View style={styles.contentSection}>
                      <View style={styles.contentContainer}>
                        <Text style={styles.contentContainerHeading}>OM MEG</Text>
                        <Text style={styles.contentContainerHeadingLine}></Text>
                        <View style={styles.contentContainerPara}>
                          <Text style={styles.contentContainerParaText}>
                            {profileData.replace(/(<([^>]+)>)/gi, '')}
                          </Text>
                        </View>
                      </View>
    
                      <View style={styles.experienceSection}>
                        <Text style={styles.contentContainerHeading}>
                          ARBEIDSERFARING
                        </Text>
                        {experianceData?.map((item, index) => {
                          return (
                            <>
                              <Text
                                style={styles.educationContainerHeadingLine}
                              ></Text>
                              <Text style={styles.educationContainerHeadingPara}>
                                {item?.jobTitle} | {item?.employer}
                              </Text>
                              <View style={styles.educationContainerDate}>
                                <Text style={styles.educationContainerDateText}>
                                  {item?.startDate} -{' '}
                                  {item.toggle ? 'dags dato' : item?.endDate}
                                </Text>
                              </View>
    
                              <View style={styles.educationContainerPara}>
                                <Text style={styles.educationContainerParaText}>
                                  {item.additionalInformation.replace(
                                    /(<([^>]+)>)/gi,
                                    ''
                                  )}
                                </Text>
                              </View>
                            </>
                          )
                        })}
                      </View>
    
                      {enabledAccordians.Praksisplasser === true ? (
                        <View style={styles.experienceSection}>
                          <Text style={styles.contentContainerHeading}>
                            Praksisplasser
                          </Text>
                          {internships?.map((item, index) => {
                            return (
                              <>
                                <Text
                                  style={styles.educationContainerHeadingLine}
                                ></Text>
                                <Text style={styles.educationContainerHeadingPara}>
                                  {item?.jobTitle} | {item?.employer}
                                </Text>
                                <View style={styles.educationContainerDate}>
                                  <Text style={styles.educationContainerDateText}>
                                    {item?.startDate} -{' '}
                                    {item.toggle ? 'dags dato' : item?.endDate}
                                  </Text>
                                </View>
    
                                <View style={styles.educationContainerPara}>
                                  <Text style={styles.educationContainerParaText}>
                                    {item.additionalInformation.replace(
                                      /(<([^>]+)>)/gi,
                                      ''
                                    )}
                                  </Text>
                                </View>
                              </>
                            )
                          })}
                        </View>
                      ) : null}
    
                      <View style={styles.contentSectionBottom}>
                        <View style={styles.contentSectionBottomLeft}>
                          <View style={styles.contentSectionBottomLeftContent}>
                            <Text style={styles.contentContainerHeading}>
                              PROFESJONELL EKSPERTISE
                            </Text>
                            <Text
                              style={styles.contentContainerHeadingLineTwo}
                            ></Text>
    
                            <View
                              style={styles.contentSectionBottomLeftContentSide}
                            >
                              <Text
                                style={
                                  styles.contentSectionBottomLeftContentSideTitle
                                }
                              >
                                ferdigheter
                              </Text>
    
                              <View
                                style={
                                  styles.contentSectionBottomLeftContentSideProgress
                                }
                              >
                                {properties?.map((item) => (
                                  <View
                                    style={
                                      styles.contentSectionBottomLeftContentSideSetting
                                    }
                                  >
                                    {cvData?.displayProgressBar === true ? (
                                      <View>
                                        <Text
                                          style={
                                            styles.contentSectionBottomLeftContentSideProgressText
                                          }
                                        >
                                          {item?.name}
                                        </Text>
                                        <View
                                          style={{
                                            backgroundColor: 'grey',
                                            height: '5px',
                                            maxWidth: '95%',
                                          }}
                                        >
                                          <View
                                            style={{
                                              width: `${item?.value}%`,
                                              color: 'grey',
                                              backgroundColor: 'rgb(237, 125, 49)',
                                              height: '5px',
                                            }}
                                          ></View>
                                        </View>
                                      </View>
                                    ) : (
                                      <Text
                                        style={
                                          styles.contentSectionBottomLeftContentSideProgressText
                                        }
                                      >
                                        {item?.name}
                                      </Text>
                                    )}
                                  </View>
                                ))}
                              </View>
                            </View>
                          </View>
    
                          <View style={styles.contentSectionBottomLeftContent}>
                            <Text style={styles.contentContainerHeading}>
                              ANNET
                            </Text>
                            <Text
                              style={styles.contentContainerHeadingLineTwo}
                            ></Text>
                            <View
                              style={styles.contentSectionBottomLeftContentSide}
                            >
                              <Text
                                style={
                                  styles.contentSectionBottomLeftContentSideTitle
                                }
                              >
                                SPRÅK
                              </Text>
                              <View
                                style={
                                  styles.contentSectionBottomLeftContentSideSetting
                                }
                              >
                                {languages?.map((item) => (
                                  // <View
                                  //   style={
                                  //     styles.contentSectionBottomLeftContentSideProgress
                                  //   }
                                  // >
                                  <Text
                                    style={
                                      styles.contentSectionBottomLeftContentSideProgressText
                                    }
                                  >
                                    {item?.name} {item?.value}
                                  </Text>
                                  // </View>
                                ))}
                              </View>
                            </View>
    
                            {enabledAccordians.Kurs === true ? (
                              <View
                                style={styles.contentSectionBottomLeftContentSide}
                              >
                                <Text
                                  style={
                                    styles.contentSectionBottomLeftContentSideTitle
                                  }
                                >
                                  KURS
                                </Text>
                                <View
                                  style={
                                    styles.contentSectionBottomLeftContentSideSetting
                                  }
                                >
                                  {courses?.map((item) => (
                                    // <View
                                    //   style={
                                    //     styles.contentSectionBottomLeftContentSideProgress
                                    //   }
                                    // >
                                    <Text
                                      style={
                                        styles.contentSectionBottomLeftContentSideProgressText
                                      }
                                    >
                                      {item?.name}
                                    </Text>
                                    // </View>
                                  ))}
                                </View>
                              </View>
                            ) : null}
    
                            {enabledAccordians.Hobbyer === true ? (
                              <View
                                style={styles.contentSectionBottomLeftContentSide}
                              >
                                <Text
                                  style={
                                    styles.contentSectionBottomLeftContentSideTitle
                                  }
                                >
                                  HOBBY
                                </Text>
                                <View
                                  style={
                                    styles.contentSectionBottomLeftContentSideSetting
                                  }
                                >
                                  <Text>
                                    {hobbies?.map((item, index) => (
                                      <Text
                                        style={
                                          styles.contentSectionBottomLeftContentSideProgressText
                                        }
                                      >
                                        {index === hobbies.length - 1
                                          ? item?.name + '.'
                                          : item?.name + ', '}
                                      </Text>
                                    ))}
                                  </Text>
                                </View>
                              </View>
                            ) : null}
                          </View>
                        </View>
    
                        <View style={styles.contentSectionBottomRight}>
                          <View style={styles.contentSectionBottomRightContent}>
                            <View style={styles.contentSectionBottomLeftContent}>
                              <Text style={styles.contentContainerHeading}>
                                UTDANNELSE
                              </Text>
                              <Text
                                style={styles.contentContainerHeadingLineTwo}
                              ></Text>
    
                              <View style={styles.studingContent}>
                                {educationData?.map((item) => (
                                  <View style={styles.settingContent}>
                                    <Text style={{ textTransform: 'uppercase' }}>
                                      {item?.study}
                                    </Text>
                                    <Text style={styles.settingContentText}>
                                      {item?.school}
                                    </Text>
                                    <View style={styles.settingContentDate}>
                                      <Text style={styles.settingContentDateText}>
                                        {item.startDate.length === 0
                                          ? 'Startdato -'
                                          : moment(item?.startDate).format(
                                              'MM YYYY'
                                            ) + ' - '}
                                        {item.endDate.length === 0
                                          ? ' sluttdato'
                                          : moment(item?.endDate).format('MM YYYY')}
                                      </Text>
                                    </View>
                                  </View>
                                ))}
                              </View>
                            </View>
    
                            {enabledAccordians.Referanser === true ? (
                              <View style={styles.contentSectionBottomLeftContent}>
                                <Text style={styles.contentContainerHeading}>
                                  Referanser
                                </Text>
                                <Text
                                  style={styles.contentContainerHeadingLineTwo}
                                ></Text>
                                {newToggleData ? (
                                  <Text
                                    style={{
                                      marginTop: '8px',
                                      wordBreak: 'break-all',
                                      fontSize: '13px',
                                      fontFamily: 'Calibri',
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    Oppgis ved forespørsel
                                  </Text>
                                ) : (
                                  <View style={styles.studingContent}>
                                    {refrence?.map((item) => (
                                      <View style={styles.settingContent}>
                                        <Text>
                                          {item?.name + ' - ' + item?.companyName}
                                        </Text>
                                        <Text style={styles.settingContentText}>
                                          {item?.email}
                                        </Text>
                                      </View>
                                    ))}
                                  </View>
                                )}
                              </View>
                            ) : null}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Page>
              </Document>
              }
              fileName={cvData.saveAs}
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

export default TemplateEleven
