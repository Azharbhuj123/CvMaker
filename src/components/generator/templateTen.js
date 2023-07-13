import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext, Link } from 'react-router-dom'
import moment from 'moment'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  languageData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  propertiesData,
  referenceData,
  getRefToggle,
  getNewRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'
import MyraidRegular from '../../assests/fonts/myriad-pro/MYRIADPRO-REGULAR.OTF'
import MyraidBold from '../../assests/fonts/myriad-pro/MYRIADPRO-BOLD.OTF'
import {
  Document,
  Font,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

const TemplateTen = () => {
  let pdfComponent = useRef()
  const cvData = useSelector(CV_DATA)
  const toggleData = useSelector(getRefToggle)
  const newToggleData = useSelector(getNewRefToggle)
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let printButtonRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const [changeOccured, setChangeOccured] = useState(false)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const courses = useSelector(coursesData)
  const refrence = useSelector(referenceData)
  const properties = useSelector(propertiesData)
  const languages = useSelector(languageData)
  // const dob = moment(cvData?.DOB).format("DD,MM,YYYY");
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   console.log("wow");
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('templateten-container'),
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
    family: 'Myriad Pro',
    fonts: [{ src: MyraidRegular }, { src: MyraidBold }],
  })

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      padding: 10,
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
      alignItems: 'center',
      gap: 3,
      justifyContent: 'center',
      textAlign: 'center',
    },
    headerTitle: {
      color: '#000',
      fontFamily: 'Myriad Pro',
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: 1.5,
    },
    headersubTitle: {
      color: '#000',
      fontFamily: 'Myriad Pro',
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 4,
    },
    headerInfo: {
      alignItems: 'center',
      paddingTop: 10,
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
    },
    headerInfoAddress: {
      color: '#000',
      fontFamily: 'Myriad Pro',
      fontSize: 12,
    },
    headerInfoDetail: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    headerInfoPhone: {
      color: '#000',
      fontFamily: 'Myriad Pro',
      fontSize: 12,
    },
    headerInfoPhoneText: {
      color: '#000',
      fontFamily: 'Myriad Pro',
      fontSize: 12,
    },
    educationSection: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 15,
      width: '100%',
    },
    educationHeading: {
      alignItems: 'center',
      borderBottom: '1px solid #000',
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: 2,
      width: '100%',
    },
    educationHeadingTitle: {
      color: '#000',
      fontFamily: 'Myriad Pro',
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    educationWrapper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 10,
    },
    educationWrapperHead: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      fontWeight: 'bold',
      gap: 10,
      justifyContent: ' center',
      paddingTop: 10,
      width: '100%',
    },
    educationWrapperHeadDate: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      justifyContent: 'flex-end',
      width: 120,
    },
    educationWrapperHeadDateText: {
      fontFamily: 'Myriad Pro',
      fontSize: 12,
      // fontWeight: 500,
    },
    educationWrapperHeadRght: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      width: '75%',
    },
    educationWrapperHeadRghtText: {
      fontFamily: 'Myriad Pro',
      fontSize: 12,
      fontWeight: 500,
    },
    educationWrapperHeadRghtPara: {
      fontFamily: 'Myriad Pro',
      fontSize: 12,
      wordBreak: 'break-all',
      textAlign: 'left',
      fontWeight: 'light',
    },
    educationWrapperHeadRghtParaText: {
      color: 'black',
      fontFamily: 'Myriad Pro',
      fontSize: 11,
      wordBreak: 'break-all',
      textAlign: 'left',
    },
    studyHeadingSection: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      paddingTop: 10,
      width: '100%',
    },
    studyHeadingSectionHead: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: 120,
      justifyContent: 'flex-end',
    },
    studyHeadingSectionHeadTitle: {
      fontSize: 13,
      fontWeight: 500,
      fontFamily: 'Myriad Pro',
      textAlign: 'right',
    },
    studyHeadingSectionHeadCourse: {
      display: 'flex',
      flexdirection: 'column',
      gap: 10,
      width: '75%',
    },
    studyHeadingSectionHeadCourseRight: {
      display: 'flex',
      flexdirection: 'column',
      gap: 10,
      width: '75%',
    },
    studyHeadingSectionHeadCourseRightText: {
      fontFamily: 'Myriad Pro',
      fontWeight: 300,
      fontSize: 11,
    },
    referenceSection: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      paddingTop: 10,
      width: '100%',
    },
    referenceText: {
      fontSize: 12,
      fontFamily: 'Myriad Pro',
      fontWeight: 500,
      textAlign: 'right',
    },
    referenceSectionRight: {
      display: 'flex',
      flexDirection: 'row',
      textAlign: 'left',
      width: '75%',
    },
    referenceSectionRightText: {
      fontSize: 12,
      fontFamily: 'Myriad Pro',
    },
  })

  return (
    <>
      <PDFViewer style={styles.document}>
        <Document style={styles.document}>
          <Page size='A4' style={styles.page}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>
                  {cvData?.firstName + ' ' + cvData?.lastName}
                </Text>
                <Text style={styles.headersubTitle}>{cvData?.jobTitle}</Text>
              </View>

              <View style={styles.headerInfo}>
                <Text style={styles.headerInfoAddress}>
                  {cvData?.physicalAddress}
                </Text>
                <View style={styles.headerInfoDetail}>
                  <View style={styles.headerInfoDetail}>
                    <Text style={styles.headerInfoPhone}>Tlf:</Text>
                    <Text style={styles.headerInfoPhoneText}>
                      {cvData?.phone}
                    </Text>
                    <Text style={styles.headerInfoPhoneText}>|</Text>
                    <View style={styles.headerInfoDetail}>
                      <Text style={styles.headerInfoPhone}>E-post:</Text>
                      <Text style={styles.headerInfoPhoneText}>
                        {cvData?.email}
                      </Text>
                    </View>
                  </View>
                </View>
                {cvData?.DOB == '' ? null : (
                  <View style={styles.headerInfoDetail}>
                    <Text style={styles.headerInfoPhone}>Født: </Text>
                    <Text style={styles.headerInfoPhoneText}>
                      {moment(cvData?.DOB).format('DD,MM,YYYY')}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.educationSection}>
                <View style={styles.educationHeading}>
                  <Text style={styles.educationHeadingTitle}>Utdanning</Text>
                </View>
                {educationData?.map((item) => (
                  <>
                    <View style={styles.educationWrapper}>
                      <View style={styles.educationWrapperHead}>
                        {item.startDate === '' ? (
                          <Text style={styles.educationWrapperHeadDateText}>
                            Startdato - sluttdato
                          </Text>
                        ) : (
                          <View style={styles.educationWrapperHeadDate}>
                            <Text style={styles.educationWrapperHeadDateText}>
                              {moment(item?.startDate).format('MM-YYYY') +
                                ' - '}
                              {item.toggle
                                ? 'dags dato'
                                : moment(item?.endDate).format('MM-YYYY')}
                            </Text>
                          </View>
                        )}
                        <View style={styles.educationWrapperHeadRght}>
                          <Text style={styles.educationWrapperHeadRghtText}>
                            {item?.study + ', ' + item?.school}
                          </Text>
                          <View style={styles.educationWrapperHeadRghtPara}>
                            <Text
                              style={styles.educationWrapperHeadRghtParaText}
                            >
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                ))}
              </View>

              <View style={styles.educationSection}>
                <View style={styles.educationHeading}>
                  <Text style={styles.educationHeadingTitle}>Erfaring</Text>
                </View>
                {experianceData?.map((item) => (
                  <View style={styles.educationWrapper}>
                    <View style={styles.educationWrapperHead}>
                      {item.startDate === '' ? (
                        <Text style={styles.educationWrapperHeadDateText}>
                          Startdato - sluttdato
                        </Text>
                      ) : (
                        <View style={styles.educationWrapperHeadDate}>
                          <Text style={styles.educationWrapperHeadDateText}>
                            {moment(item?.startDate).format('MM-YYYY') + ' - '}
                          </Text>
                          <Text style={styles.educationWrapperHeadDateText}>
                            {item.toggle
                              ? 'dags dato'
                              : moment(item?.endDate).format('MM-YYYY')}
                          </Text>
                        </View>
                      )}
                      <View style={styles.educationWrapperHeadRght}>
                        <Text style={styles.educationWrapperHeadRghtText}>
                          {item?.jobTitle} {', ' + item?.employer}
                        </Text>
                        <View style={styles.educationWrapperHeadRghtPara}>
                          <Text style={styles.educationWrapperHeadRghtParaText}>
                            {item.additionalInformation.replace(
                              /(<([^>]+)>)/gi,
                              ''
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {accordiansEnabled.Praksisplasser === true ? (
                <View style={styles.educationSection}>
                  <View style={styles.educationHeading}>
                    <Text style={styles.educationHeadingTitle}>
                      Praksisplasser
                    </Text>
                  </View>
                  {internships?.map((item) => (
                    <View style={styles.educationWrapper}>
                      <View style={styles.educationWrapperHead}>
                        {item.startDate === '' ? (
                          <Text style={styles.educationWrapperHeadDateText}>
                            Startdato - sluttdato
                          </Text>
                        ) : (
                          <View style={styles.educationWrapperHeadDate}>
                            <Text style={styles.educationWrapperHeadDateText}>
                              {moment(item?.startDate).format('MM-YYYY') +
                                ' - '}
                              {item.toggle
                                ? 'dags dato'
                                : moment(item?.endDate).format('MM-YYYY')}
                            </Text>
                          </View>
                        )}
                        <View style={styles.educationWrapperHeadRght}>
                          <Text style={styles.educationWrapperHeadRghtText}>
                            {item?.jobTitle} {', ' + item?.employer}
                          </Text>
                          <View style={styles.educationWrapperHeadRghtPara}>
                            <Text
                              style={styles.educationWrapperHeadRghtParaText}
                            >
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}

              <View style={styles.educationSection}>
                <View style={styles.educationHeading}>
                  <Text style={styles.educationHeadingTitle}>Annet</Text>
                </View>

                <View style={styles.studyHeadingSection}>
                  <View style={styles.studyHeadingSectionHead}>
                    <Text style={styles.studyHeadingSectionHeadTitle}>
                      Språk
                    </Text>
                  </View>

                  <View style={styles.studyHeadingSectionHeadCourse}>
                    {languages?.map((item) => (
                      <View style={styles.studyHeadingSectionHeadCourseRight}>
                        <Text
                          style={styles.studyHeadingSectionHeadCourseRightText}
                        >
                          {item?.name} {item?.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {accordiansEnabled.Kurs === true ? (
                  <View style={styles.studyHeadingSection}>
                    <View style={styles.studyHeadingSectionHead}>
                      <Text style={styles.studyHeadingSectionHeadTitle}>
                        Kurs
                      </Text>
                    </View>
                    <View style={styles.studyHeadingSectionHeadCourse}>
                      {courses?.map((item, index) => (
                        <View
                          style={styles.studyHeadingSectionHeadCourseRight}
                          key={index}
                        >
                          <Text
                            style={
                              styles.studyHeadingSectionHeadCourseRightText
                            }
                          >
                            {item?.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : null}

                <View style={styles.studyHeadingSection}>
                  <View style={styles.studyHeadingSectionHead}>
                    <Text style={styles.studyHeadingSectionHeadTitle}>
                      Ferdigheter
                    </Text>
                  </View>
                  <View style={styles.studyHeadingSectionHeadCourse}>
                    <Text>
                      {properties?.map((item, index) => (
                        <View
                          style={styles.studyHeadingSectionHeadCourseRight}
                          key={index}
                        >
                          <Text
                            style={
                              styles.studyHeadingSectionHeadCourseRightText
                            }
                          >
                            {index === properties.length - 1
                              ? item.name + ' .'
                              : item.name + ', '}
                          </Text>
                        </View>
                      ))}
                    </Text>
                  </View>
                </View>

                {accordiansEnabled.Hobbyer === true ? (
                  <>
                    <View style={styles.studyHeadingSection}>
                      <View style={styles.studyHeadingSectionHead}>
                        <Text style={styles.studyHeadingSectionHeadTitle}>
                          Hobby
                        </Text>
                      </View>
                      <View style={styles.studyHeadingSectionHeadCourse}>
                        <Text>
                          {hobbies?.map((item, index) => (
                            <View
                              style={styles.studyHeadingSectionHeadCourseRight}
                              key={index}
                            >
                              <Text
                                style={
                                  styles.studyHeadingSectionHeadCourseRightText
                                }
                              >
                                {index === hobbies.length - 1
                                  ? item.name + ' .'
                                  : item.name + ', '}
                              </Text>
                            </View>
                          ))}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : null}

                {cvData.drivingLicense === '' ? null : (
                  <>
                    <View style={styles.studyHeadingSection}>
                      <View style={styles.studyHeadingSectionHead}>
                        <Text style={styles.studyHeadingSectionHeadTitle}>
                          Førerkort
                        </Text>
                      </View>
                      <View style={styles.studyHeadingSectionHeadCourseRight}>
                        <Text
                          style={styles.studyHeadingSectionHeadCourseRightText}
                        >
                          {cvData.drivingLicense}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </View>

              {accordiansEnabled.Referanser === true ? (
                <View style={styles.educationSection}>
                  <View style={styles.educationHeading}>
                    <Text style={styles.educationHeadingTitle}>Referanser</Text>
                  </View>
                  {newToggleData ? (
                    <View
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '10px',
                      }}
                    >
                      <Text
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                          fontSize: 12,
                          fontFamily: 'Myriad Pro',
                        }}
                      >
                        Oppgis ved forespørsel
                      </Text>
                    </View>
                  ) : (
                    <>
                      {refrence?.map((item, index) => (
                        <View style={styles.referenceSection} key={index}>
                          <View style={styles.studyHeadingSectionHead}>
                            <Text style={styles.referenceText}>
                              {item.name}
                            </Text>
                          </View>
                          <View style={styles.referenceSectionRight}>
                            <Text style={styles.referenceSectionRightText}>
                              {item.email !== ''
                                ? item?.companyName + ', ' + item?.email
                                : item?.companyName}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </>
                  )}
                </View>
              ) : null}
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

export default TemplateTen
