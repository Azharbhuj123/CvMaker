import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineCar, AiOutlineMail } from 'react-icons/ai'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi'
import TimesNewRomanRegular from '../../assests/fonts/Times New Roman/timesnewroman.ttf'
import TimesNewRomanBold from '../../assests/fonts/Times New Roman/timesnewromanbold.ttf'
import CalibriRegular from '../../assests/fonts/Calibri-Font/Calibri/Calibri.ttf'
import CalibriBold from '../../assests/fonts/Calibri-Font/Calibri/calibrib.ttf'

import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  profileRichTextData,
  getAdditionalAccordian,
  coursesData,
  propertiesData,
  getHobbies,
  languageData,
  getInternships,
  referenceData,
  getRefToggle,
  getNewRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import { BsTelephone } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import telephone from '../../assests/icons/phone.png'
import address from '../../assests/icons/locate.png'
import location from '../../assests/icons/locate_fill.png'
import mail from '../../assests/icons/mail.png'
import car from '../../assests/icons/car.png'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import ProgressBar from './progressBar'
import {
  sendFileToBackend,
  sendPrintedDocument,
} from '../../helper/helperFunctions'
import {
  Document,
  Font,
  Image,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import PdfViewer from '../../pages/PdfViewer'

const TemplateFourteen = (props) => {
  const [page, setPage] = useState(1)

  console.log(props, 'props in 6')
  const [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let printButtonRef = useRef()
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const toggleData = useSelector(getRefToggle)
  const newToggleData = useSelector(getNewRefToggle)
  let pdfComponent = useRef()
  const cvData = useSelector(CV_DATA)
  const [isChecked, setIsChecked] = useState(false)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const refrence = useSelector(referenceData)
  const internships = useSelector(getInternships)
  const courses = useSelector(coursesData)
  const properties = useSelector(propertiesData)
  const profileData = useSelector(profileRichTextData)
  const languages = useSelector(languageData)
  const [changeOccured, setChangeOccured] = useState(false)
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   console.log("wow");
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async (props) => {
    await sendFileToBackend(
      document.getElementsByClassName('template-fourteen-container'),
      cvData.email,
      displayTemplate
    )
  }

  useEffect(() => {
    console.log('re render!!!')
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
    family: 'Times New Roman',
    fonts: [{ src: TimesNewRomanRegular }, { src: TimesNewRomanBold }],
  })

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
      width: '60%',
    },
    pageLeftHeading: {
      backgroundColor: '#4bacc6',
      paddingVertical: 30,
      paddingHorizontal: 25,
    },
    pageLeftHeadingTitle: {
      color: '#fff',
      fontFamily: 'Calibri',
      fontWeight: 900,
      fontSize: 30,
      wordBreak: 'break-all',
    },
    pageLeftHeadingDate: {
      color: '#fff',
      fontFamily: 'Calibri',
      fontSize: 12,
      wordBreak: 'break-all',
    },
    pageLeftHeadingJob: {
      color: '#fff',
      fontFamily: 'Calibri',
      fontSize: 14,
      paddingTop: 10,
      fontWeight: 900,
      wordBreak: 'break-all',
    },
    pageRightSection: {
      alignItems: 'center',
      backgroundColor: '#ede7e7',
      display: 'flex',
      flexDirection: 'column',
      overflowWrap: 'break-word',
      width: '40%',
    },
    pageLeftContent: {
      paddingHorizontal: 10,
      paddingTop: 16,
    },
    pageLeftContentHeading: {
      // alignItems: 'center',
      display: 'flex',
      gap: 8,
      height: 32,
    },
    pageLeftContentHeadingColor: {
      backgroundColor: '#4bacc6',
      height: 28,
      width: 14,
    },
    pageLeftContentHeadingTitle: {
      fontFamily: 'Calibri',
      fontSize: 16,
      fontWeight: 500,
      marginLeft: 20,
      marginTop: 8,
      width: 200,
    },
    pageLeftContentJobTitle: {
      marginVertical: 12,
      marginHorizontal: 16,
      display: 'flex',
      flexDirection: 'row',
    },
    pageLeftContentJobTitleHeader: {
      // alignItems: 'center',
      display: 'flex',
      // flexDirection: 'row',
      justifyContent: 'space-between',
      wordBreak: 'break-all',
    },
    pageLeftContentJobTitleHeaderText: {
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: 13,
      wordBreak: 'break-all',
      color: 'gray',
      fontFamily: 'Calibri',
    },
    pageLeftContentJobTitleDate: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginLeft: 150,
      marginRight: 30,
      justifyContent: 'flex-end',
    },
    pageLeftContentJobTitleDateText: {
      marginTop: 1,
      color: 'gray',
      fontFamily: 'Calibri',
      fontSize: 12,
      wordBreak: 'break-all',
    },
    pageLeftContentPara: {
      fontFamily: 'Calibri',
      color: 'gray',
      wordBreak: 'break-all',
      fontSize: 12,
      marginTop: -10,
      marginBottom: 20,
      marginLeft: 15,
      color: 'black',
    },
    pageLeftContentEnd: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    pageLeftSkill: {
      width: '45%',
    },
    pageLeftSkillContent: {
      marginVertical: 16,
      marginLeft: 16,
    },
    pageLeftSkillContentDiv: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    pageLeftSkillContentText: {
      fontSize: 12,
      color: 'gray',
      fontFamily: 'Calibri',
      wordBreak: 'break-all',
    },
    pageLeftSkillContenttext: {
      width: 200,
      fontSize: 12,
      color: 'gray',
      fontFamily: 'Calibri',
      wordBreak: 'break-all',
    },
    ProgressBar: {},
    ProgressBarFuel: {
      height: 8,
      marginTop: 8,
      width: '95%',
      // backgroundColor: 'white',
    },
    ProgressBarFuelWrapper: {
      height: 8,
      width: '100%',
      color: ' rgb(75, 172, 198)',
      borderBottom: 'dotted',
      backgroundColor: 'white',
      backgroundColor: '#303846',
      height: 8,
      width: '80%',
    },
    pageRightProfile: {
      marginTop: 15,
    },
    pageRightProfileCircle: {
      alignItems: 'center',
      backgroundColor: 'gray',
      borderRadius: 140,
      display: 'flex',
      height: 140,
      justifyContent: 'center',
      width: 140,
    },
    pageRightProfileCircleTwo: {
      alignItems: 'center',
      backgroundColor: '#ede7e7',
      borderRadius: 140,
      display: 'flex',
      height: 120,
      justifyContent: 'center',
      width: 120,
    },
    pageRightProfileCircleThree: {
      alignItems: 'center',
      backgrounColor: 'grey',
      borderRadius: 150,
      display: 'flex',
      height: 140,
      justifyContent: 'center',
      width: 140,
    },
    pageRightProfileCircleFour: {
      alignItems: 'center',
      backgroundColor: 'gray',
      borderRadius: 140,
      display: 'flex',
      height: 105,
      justifyContent: 'center',
      width: 105,
    },
    pageRightSectionContent: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      overflowWrap: 'break-word',
      padding: 32,
      width: '100%',
    },
    pageRightSectionContentTitle: {
      borderBottom: '4px solid #4bacc6',
      fontFamily: 'Calibri',
      fontWeight: 800,
      fontSize: 16,
      letterSpacing: 0.7,
      marginTop: 12,
      paddingBottom: 2,
      width: 'auto',
      wordBreak: 'break-all',
    },
    pageRightSectionContentText: {
      fontFamily: 'Calibri',
      fontSize: 9,
      marginTop: 16,
      paddingBottom: 8,
      textAlign: 'center',
      wordBreak: 'break-all',
      color: 'grey',
    },
    pageRightSectionContentList: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      fontFamily: 'Calibri',
      gap: 2,
      overflowWrap: 'break-word',
      width: '100%',
      marginTop: 10,
    },
    pageRightSectionContentCircle: {
      alignitems: 'center',
      justifyContent: 'center',
      display: 'flex',
      backgroundColor: '#4bacc6',
      borderRadius: 48,
      height: 25,
      justifyContent: 'center',
      width: 25,
    },
    pageRightSectionContenttext: {
      fontFamily: 'Calibri',
      fontSize: 11,
      marginBottom: 8,
      textAlign: 'center',
      width: '80%',
      wordBreak: 'break-all',
      marginTop: 12,
    },
    pageRightSectionReference: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    pageRightSectionContentTitleExtra: {
      borderBottom: '4px solid #4bacc6',
      fontFamily: 'Calibri',
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: 1,
      paddingBottom: 4,
      width: 'auto',
      wordBreak: 'break-all',
      color: 'rgb(237, 231, 231)',
    },
    pageRightSectionReferenceBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      overflowWrap: 'break-word',
      width: '100%',
      marginTop: 15,
    },
    pageRightSectionReferenceBoxLeft: {
      width: '30%',
    },
    pageRightSectionReferenceBoxLeftText: {
      fontFamily: 'Calibri',
      fontSize: 13,
      fontWeight: 500,
      wordBreak: 'break-all',
      margin: 0,
      padding: 0,
    },
    pageRightSectionReferenceBoxRight: {
      width: '70%',
    },
    pageRightSectionReferenceBoxRightText: {
      fontFamily: 'Calibri',
      fontSize: 11,
      wordBreak: 'break-all',
      margin: 0,
      padding: 0,
      textAlign: 'left',
    },
    pageRightSectionReferenceBoxLeftHeading: {
      textAlign: 'left',
      fontWeight: 600,
      fontSize: 12,
      wordbreak: 'break-all',
      fontFamily: 'Calibri',
    },
    pageRightSectionReferenceBoxLeftWrite: {
      textAlign: 'left',
      margin: 0,
      padding: 0,
      fontSize: 12,
      color: 'grey',
      fontFamily: 'Calibri',
      wordBreak: 'break-all',
    },
    pageRightSectionReferenceBoxRef: {
      width: '100%',
    },
  })

  return (
    <>
      <PDFViewer style={styles.document}>
        <Document style={styles.document}>
            <Page size='A4' style={styles.page}>
              <View style={styles.pageLeftSection}>
                <View style={styles.pageLeftHeading}>
                  <Text style={styles.pageLeftHeadingTitle}>
                    {cvData?.firstName + ' ' + cvData?.lastName}
                  </Text>
                  {cvData?.DOB == '' ? null : (
                    <Text style={styles.pageLeftHeadingDate}>
                      {moment(cvData?.DOB).format('DD,MM,YYYY')}
                    </Text>
                  )}
                  <Text style={styles.pageLeftHeadingJob}>
                    {cvData?.jobTitle}
                  </Text>
                </View>

                <View style={styles.pageLeftContent}>
                  <View style={styles.pageLeftContentHeading}>
                    <View style={styles.pageLeftContentHeadingColor}>
                      <Text style={styles.pageLeftContentHeadingTitle}>
                        ARBEIDSERFARING
                      </Text>
                    </View>
                  </View>

                  {experianceData.map((item) => (
                    <View>
                      <View style={styles.pageLeftContentJobTitle}>
                        <View style={styles.pageLeftContentJobTitleHeader}>
                          <Text
                            style={styles.pageLeftContentJobTitleHeaderText}
                          >
                            {item?.jobTitle} | {item?.employer}
                          </Text>
                        </View>
                        <View style={styles.pageLeftContentJobTitleDate}>
                          <Text style={styles.pageLeftContentJobTitleDateText}>
                            {item.startDate.length === 0
                              ? 'Startdato -'
                              : moment(item?.startDate).format('MM YYYY') +
                                ' - '}
                            {item.toggle
                              ? 'dags dato'
                              : item.endDate.length === 0
                              ? ' Sluttdato'
                              : moment(item?.endDate).format('YYYY-MM')}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.pageLeftContentPara}>
                          {item.additionalInformation.replace(
                            /(<([^>]+)>)/gi,
                            ''
                          )}
                        </Text>
                      </View>
                    </View>
                  ))}

                  <View style={styles.pageLeftContentHeading}>
                    <View style={styles.pageLeftContentHeadingColor}>
                      <Text style={styles.pageLeftContentHeadingTitle}>
                        UTDANNING
                      </Text>
                    </View>
                  </View>

                  {educationData?.map((item) => (
                    <View>
                      <View style={styles.pageLeftContentJobTitle}>
                        <View style={styles.pageLeftContentJobTitleHeader}>
                          <Text
                            style={styles.pageLeftContentJobTitleHeaderText}
                          >
                            {item?.study} | {item?.school}
                          </Text>
                        </View>
                        <View style={styles.pageLeftContentJobTitleDate}>
                          <Text style={styles.pageLeftContentJobTitleDateText}>
                            {item.startDate.length === 0
                              ? 'Startdato -'
                              : moment(item?.startDate).format('MM YYYY') +
                                ' - '}{' '}
                            {item.toggle
                              ? 'dags dato'
                              : item.endDate.length === 0
                              ? ' Sluttdato'
                              : moment(item?.endDate).format('YYYY-MM')}
                          </Text>
                        </View>
                      </View>

                      <View>
                        <Text style={styles.pageLeftContentPara}>
                          {item.additionalInformation.replace(
                            /(<([^>]+)>)/gi,
                            ''
                          )}
                        </Text>
                      </View>
                    </View>
                  ))}

                  {accordiansEnabled.Praksisplasser === true ? (
                    <>
                      <View style={styles.pageLeftContentHeading}>
                        <View style={styles.pageLeftContentHeadingColor}>
                          <Text style={styles.pageLeftContentHeadingTitle}>
                            PRAKSISPLASSER
                          </Text>
                        </View>
                      </View>
                      {internships?.map((item) => {
                        return (
                          <View>
                            <View style={styles.pageLeftContentJobTitle}>
                              <View
                                style={styles.pageLeftContentJobTitleHeader}
                              >
                                <Text
                                  style={
                                    styles.pageLeftContentJobTitleHeaderText
                                  }
                                >
                                  {item?.jobTitle} | {item?.employer}
                                </Text>
                              </View>
                              <View style={styles.pageLeftContentJobTitleDate}>
                                <Text
                                  style={styles.pageLeftContentJobTitleDateText}
                                >
                                  {item.startDate.length === 0
                                    ? 'Startdato -'
                                    : moment(item?.startDate).format(
                                        'MM YYYY'
                                      ) + ' - '}{' '}
                                  {item.toggle
                                    ? 'dags dato'
                                    : item.endDate.length === 0
                                    ? ' Sluttdato'
                                    : moment(item?.endDate).format('YYYY-MM')}
                                </Text>
                              </View>
                            </View>
                            <View>
                              <Text style={styles.pageLeftContentPara}>
                                {item.additionalInformation.replace(
                                  /(<([^>]+)>)/gi,
                                  ''
                                )}
                              </Text>
                            </View>
                          </View>
                        )
                      })}
                    </>
                  ) : null}

                  <View style={styles.pageLeftContentEnd}>
                    <View style={styles.pageLeftSkill}>
                      <View style={styles.pageLeftContentHeading}>
                        <View style={styles.pageLeftContentHeadingColor}>
                          <Text style={styles.pageLeftContentHeadingTitle}>
                            SPRÅK
                          </Text>
                        </View>
                      </View>
                      <View style={styles.pageLeftSkillContent}>
                        {languages.map((item, index) => (
                          <>
                            <Text style={styles.pageLeftSkillContentText}>
                              {item.name} {item?.value}
                            </Text>
                          </>
                        ))}
                      </View>
                    </View>

                    <View style={styles.pageLeftSkill}>
                      <View style={styles.pageLeftContentHeading}>
                        <View style={styles.pageLeftContentHeadingColor}>
                          <Text style={styles.pageLeftContentHeadingTitle}>
                            FERDIGHETER
                          </Text>
                        </View>
                      </View>

                      <View style={styles.pageLeftSkillContent}>
                        {properties.map((item, index) => (
                          <View style={styles.pageLeftSkillContentDiv}>
                            <Text
                              style={styles.pageLeftSkillContenttext}
                              key={index}
                            >
                              {item.name}
                            </Text>
                            {cvData.displayProgressBar === true ? (
                              <View style={{ width: '100%' }}>
                                {/* <ProgressBar
                                  backgroundcolor='white'
                                  percentage={item?.value}
                                  wrapperColor={'white'}
                                  dashed='dotted'
                                  color='rgb(75, 172, 198)'
                                  borderraadius='50%'
                                /> */}
                                <View>
                                  {/* <Text
                                    style={{
                                      fontSize: '10px',
                                      fontFamily: 'Calibri',
                                      // marginTop: '5px',
                                      width: '80%',
                                    }}
                                  >
                                    {item?.name}
                                  </Text> */}
                                  <View
                                    style={{
                                      color: 'white',
                                      width: `${item?.value}%`,
                                      borderBottom: 'dotted',
                                      // marginTop: '5px',
                                      borderBottom:
                                        '2px dotted rgb(75, 172, 198)',
                                      borderraadius: '50%',
                                    }}
                                  ></View>
                                </View>
                              </View>
                            ) : null}
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              {/* </View> */}

              <View style={styles.pageRightSection}>
                <View style={styles.pageRightProfile}>
                  <View style={styles.pageRightProfileCircle}>
                    <View style={styles.pageRightProfileCircleTwo}>
                      <View style={styles.pageRightProfileCircleThree}>
                        {cvData.profileImage ? (
                          <Image
                            src={cvData.profileImage}
                            alt='prof'
                            style={{
                              alignItems: 'center',
                              backgroundColor: '#ede7e7',
                              borderRadius: 140,
                              display: 'flex',
                              height: 120,
                              justifyContent: 'center',
                              width: 120,
                            }}
                          />
                        ) : (
                          <View
                            style={styles.pageRightProfileCircleFour}
                          ></View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.pageRightSectionContent}>
                  <Text style={styles.pageRightSectionContentTitle}>
                    MÅLSETTING
                  </Text>
                  <Text style={styles.pageRightSectionContentText}>
                    {profileData.replace(/(<([^>]+)>)/gi, '')}
                  </Text>

                  <Text style={styles.pageRightSectionContentTitle}>
                    PROFIL
                  </Text>
                  {cvData && cvData.phone ? (
                    <View style={styles.pageRightSectionContentList}>
                      <View style={styles.pageRightSectionContentCircle}>
                        <Image
                          src={telephone}
                          style={{
                            width: '12',
                            alignitems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            marginLeft: '6px',
                          }}
                        />
                      </View>
                      <Text style={styles.pageRightSectionContenttext}>
                        {cvData?.phone}
                      </Text>
                    </View>
                  ) : null}

                  {cvData && cvData.email ? (
                    <View style={styles.pageRightSectionContentList}>
                      <View style={styles.pageRightSectionContentCircle}>
                        <Image
                          src={mail}
                          style={{
                            width: '12',
                            alignitems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            marginLeft: '6px',
                          }}
                        />
                      </View>
                      <Text style={styles.pageRightSectionContenttext}>
                        {cvData?.email}
                      </Text>
                    </View>
                  ) : null}

                  {cvData && cvData.physicalAddress ? (
                    <View style={styles.pageRightSectionContentList}>
                      <View style={styles.pageRightSectionContentCircle}>
                        <Image
                          src={address}
                          style={{
                            width: '10',
                            alignitems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            marginLeft: '7px',
                          }}
                        />
                      </View>
                      <Text style={styles.pageRightSectionContenttext}>
                        {cvData?.physicalAddress}
                      </Text>
                    </View>
                  ) : null}

                  {cvData.zipCode !== '' && cvData.zipCode ? (
                    <View style={styles.pageRightSectionContentList}>
                      <View style={styles.pageRightSectionContentCircle}>
                        <Image
                          src={location}
                          style={{
                            width: '10',
                            alignitems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            marginLeft: '7px',
                          }}
                        />
                      </View>
                      <Text style={styles.pageRightSectionContenttext}>
                        {cvData?.zipCode}
                      </Text>
                    </View>
                  ) : null}

                  {cvData && cvData.drivingLicense ? (
                    <View style={styles.pageRightSectionContentList}>
                      <View style={styles.pageRightSectionContentCircle}>
                        <Image
                          src={car}
                          style={{
                            width: '10',
                            alignitems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            marginLeft: '7px',
                          }}
                        />
                      </View>
                      <Text style={styles.pageRightSectionContenttext}>
                        {cvData?.drivingLicense}
                      </Text>
                    </View>
                  ) : null}

                  <View style={styles.pageRightSectionReference}>
                    <Text style={styles.pageRightSectionContentTitleExtra}>
                      {' Extras'}
                    </Text>

                    {accordiansEnabled.Kurs === true ? (
                      <View style={styles.pageRightSectionReferenceBox}>
                        <View style={styles.pageRightSectionReferenceBoxLeft}>
                          <Text
                            style={styles.pageRightSectionReferenceBoxLeftText}
                          >
                            Kurs
                          </Text>
                        </View>
                        <View style={styles.pageRightSectionReferenceBoxRight}>
                          {courses.map((item, index) => {
                            return (
                              <Text
                                style={
                                  styles.pageRightSectionReferenceBoxRightText
                                }
                              >
                                {item.name}
                              </Text>
                            )
                          })}
                        </View>
                      </View>
                    ) : null}

                    {accordiansEnabled.Hobbyer === true ? (
                      <View style={styles.pageRightSectionReferenceBox}>
                        <View style={styles.pageRightSectionReferenceBoxLeft}>
                          <Text
                            style={styles.pageRightSectionReferenceBoxLeftText}
                          >
                            Hobby
                          </Text>
                        </View>
                        <View style={styles.pageRightSectionReferenceBoxRight}>
                          {hobbies.map((item, index) => {
                            return (
                              <Text
                                style={
                                  styles.pageRightSectionReferenceBoxRightText
                                }
                              >
                                {item.name}
                              </Text>
                            )
                          })}
                        </View>
                      </View>
                    ) : null}
                  </View>

                  {accordiansEnabled.Referanser === true ? (
                    <View style={styles.pageRightSectionReference}>
                      <Text style={styles.pageRightSectionContentTitle}>
                        Referanser
                      </Text>
                      {newToggleData ? (
                        <Text
                          style={{
                            textAlign: 'left',
                            fontSize: '10px',
                            color: 'grey',
                            marginTop: '15px',
                          }}
                        >
                          Oppgis ved forespørsel
                        </Text>
                      ) : (
                        <View style={styles.pageRightSectionReferenceBox}>
                          {refrence?.map((item, index) => (
                            <View
                              style={styles.pageRightSectionReferenceBoxRef}
                            >
                              <Text
                                style={
                                  styles.pageRightSectionReferenceBoxLeftHeading
                                }
                              >
                                {item?.name}
                              </Text>
                              <Text
                                style={
                                  styles.pageRightSectionReferenceBoxLeftWrite
                                }
                              >
                                {item.companyName}
                              </Text>
                              <Text
                                style={
                                  styles.pageRightSectionReferenceBoxLeftWrite
                                }
                              >
                                {item.email}
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ) : null}
                </View>
              </View>
            </Page>
        </Document>
      </PDFViewer>
      {/* <div className='preview-button'>
        <button onClick={() => setIsRendering(true)}>Forhåndsvisning CV</button>
      </div> */}
    </>
  )
}

export default TemplateFourteen
