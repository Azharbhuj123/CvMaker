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
import { IsRenderingContext } from '../../context/IsRenderingContext'
import { useContext } from 'react'

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
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   console.log("wow");
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('template-three-container'),
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
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderBottom: '0.5px solid hsla(0,0%,75%,.543)',
    },
    headerTitle: {
      fontFamily: 'Roboto',
      fontSize: 42,
      color: 'black',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerSubtitle: {
      fontFamily: 'Roboto',
      fontSize: 22,
      fontWeight: 400,
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
      fontSize: 20,
      fontWeight: 700,
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
      top: 22,
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
      fontSize: 11,
    },
    profileLeftContentDate: {
      fontFamily: 'Roboto',
      fontSize: 11,
      wordBreak: 'breakWord',
    },
    profileLeftPara: {},
    profileLeftParaText: {
      color: 'rgb(84, 86, 90)',
      fontFamily: 'Roboto',
      fontSize: 11,
      wordBreak: 'break-word',
    },
    referenceSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    },
    referenceSectionText: {
      color: 'rgb(84, 86, 90)',
      fontFamily: 'Roboto',
      fontSize: 11,
    },
  })

  const { isRendering, setIsRendering } = useContext(IsRenderingContext)

  return (
    <>
      <PDFViewer style={styles.document}>
        <Document style={styles.document}>
          {isRendering ? (
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
                          // <Text
                          //   style={styles.containerWrapperLeftContentTitleLine}
                          // ></Text>
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
                    {profileData !== '<p><br></p>' &&
                      profileData !== '<p></p>' && (
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
                      )}

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
          ) : null}
        </Document>
      </PDFViewer>
      {/* <div className='preview-button'>
        <button onClick={() => setIsRendering(true)}>Forhåndsvisning CV</button>
      </div> */}
    </>
  )
}

export default TemplateThree
