import React, { useEffect, useRef, useState } from 'react'
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
} from '@react-pdf/renderer'

const TemplateEleven = () => {
  let pdfComponent = useRef()
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const toggleData = useSelector(getRefToggle)
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
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   console.log("wow");
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('templateeleven-container'),
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
    },
    hederRight: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      paddingHorizontal: 5,
      paddingVertical: 10,
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
      paddingRight: 8,
      paddingTop: 8,
      width: '100%',
    },
    contentContainerHeading: {
      fontFamily: 'Calibri',
      fontSize: 16,
      fontWeight: 600,
      position: 'relative',
      wordBreak: 'break-all',
    },
    contentContainerHeadingLine: {
      border: '2px solid #ed7d31',
      top: 25,
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
      fontSize: 12,
    },
    educationContainerPara: {
      borderBottom: '1px solid black',
      paddingBottom: 8,
      width: '88%',
    },
    educationContainerParaText: {
      color: 'rgb(84, 86, 90)',
      fontFamily: 'Calibri',
      fontSize: 12,
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
      fontSize: 14,
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
      fontSize: 11,
      gap: 10,
      width: '100%',
      wordBreak: 'break-all',
    },
    contentSectionBottomLeftContentSideProgress: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: 14,
      width: '100%',
    },
    contentSectionBottomLeftContentSideProgressText: {
      fontFamily: 'Calibri',
      fontSize: 11,
      wordBreak: 'break-all',
      width: 200,
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
      fontSize: 11,
      fontFamily: 'Calibri',
      fontWeight: 'bold',
    },
    settingContentText: {
      fontSize: 11,
      fontFamily: 'Calibri',
      fontWeight: 'bold',
      wordBreak: 'break-all',
      width: '100%',
    },
  })
  
  return (
    <PDFViewer style={styles.document}>
      <Document style={styles.document}>
        <Page size='A4' style={styles.page}>
          <View style={styles.container}>
            <View style={styles.heder}>
              <View style={styles.hederLeftBox}></View>
              <View style={styles.hederRight}>
                <Text style={styles.hederRightTitle}>
                  Fornavna <Text style={{ color: 'gray' }}>Etternavn</Text>
                </Text>
                <Text style={styles.hederRightSubtitle}>software </Text>
                <View style={styles.hederRightContent}>
                  {/* <Text> */}
                  <Text>Epost: </Text>
                  <Text style={{ fontWeight: '100', color: 'gray' }}>
                    email@gmail.com/
                  </Text>
                  <Text> Tlf: </Text>
                  <Text style={{ fontWeight: '100', color: 'gray' }}>
                    924452111/
                  </Text>
                  <Text> Adresse: </Text>
                  <Text style={{ fontWeight: '100', color: 'gray' }}>
                    adress
                  </Text>
                  <Text> Førerkort: </Text>
                  <Text style={{ fontWeight: '100', color: 'gray' }}>
                    Driver license/
                  </Text>
                  <Text> Førerkort: </Text>
                  <Text style={{ fontWeight: '100', color: 'gray' }}>
                    15,06,2023
                  </Text>
                  {/* </Text> */}
                </View>
              </View>
            </View>

            <View style={styles.contentSection}>
              <View style={styles.contentContainer}>
                <Text style={styles.contentContainerHeading}>OM MEG</Text>
                <Text style={styles.contentContainerHeadingLine}></Text>
                <View style={styles.contentContainerPara}>
                  <Text style={styles.contentContainerParaText}>
                    We use both first and third-party cookies to personalise web
                    content, analyse visits to our websites and tailor
                    advertisements. Some of these cookies are necessary for the
                    website to function, whilst others require your consent.
                    More detail can be found in our cookie policy and you can
                    tailor your choices in the preference centre.
                  </Text>
                </View>
              </View>

              <View style={styles.experienceSection}>
                <Text style={styles.contentContainerHeading}>
                  ARBEIDSERFARING
                </Text>
                <Text style={styles.educationContainerHeadingLine}></Text>
                <Text style={styles.educationContainerHeadingPara}>
                  Skole | Studie
                </Text>
                <View style={styles.educationContainerDate}>
                  <Text style={styles.educationContainerDateText}>
                    2023-08 - 2023-08{' '}
                  </Text>
                </View>

                <View style={styles.educationContainerPara}>
                  <Text style={styles.educationContainerParaText}>
                    We use both first and third-party cookies to personalise web
                    content, analyse visits to our websites and tailor
                    advertisements. Some of these cookies are necessary for the
                    website to function, whilst others require your consent.
                    More detail can be found in our cookie policy and you can
                    tailor your choices in the preference centre.
                  </Text>
                </View>
              </View>

              <View style={styles.experienceSection}>
                <Text style={styles.contentContainerHeading}>
                  Praksisplasser
                </Text>
                <Text style={styles.educationContainerHeadingLine}></Text>
                <Text style={styles.educationContainerHeadingPara}>
                  Skole | Studie
                </Text>
                <View style={styles.educationContainerDate}>
                  <Text style={styles.educationContainerDateText}>
                    2023-08 - 2023-08{' '}
                  </Text>
                </View>

                <View style={styles.educationContainerPara}>
                  <Text style={styles.educationContainerParaText}>
                    We use both first and third-party cookies to personalise web
                    content, analyse visits to our websites and tailor
                    advertisements. Some of these cookies are necessary for the
                    website to function, whilst others require your consent.
                    More detail can be found in our cookie policy and you can
                    tailor your choices in the preference centre.
                  </Text>
                </View>
              </View>

              <View style={styles.contentSectionBottom}>
                <View style={styles.contentSectionBottomLeft}>
                  <View style={styles.contentSectionBottomLeftContent}>
                    <Text style={styles.contentContainerHeading}>
                      PROFESJONELL EKSPERTISE
                    </Text>
                    <Text style={styles.contentContainerHeadingLine}></Text>

                    <View style={styles.contentSectionBottomLeftContentSide}>
                      <Text
                        style={styles.contentSectionBottomLeftContentSideTitle}
                      >
                        ferdigheter
                      </Text>
                      <View
                        style={
                          styles.contentSectionBottomLeftContentSideSetting
                        }
                      >
                        <View
                          style={
                            styles.contentSectionBottomLeftContentSideProgress
                          }
                        >
                          <Text
                            style={
                              styles.contentSectionBottomLeftContentSideProgressText
                            }
                          >
                            progress
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.contentSectionBottomLeftContent}>
                    <Text style={styles.contentContainerHeading}>ANNET</Text>
                    <Text style={styles.contentContainerHeadingLine}></Text>
                    <View style={styles.contentSectionBottomLeftContentSide}>
                      <Text
                        style={styles.contentSectionBottomLeftContentSideTitle}
                      >
                        SPRÅK
                      </Text>
                      <View
                        style={
                          styles.contentSectionBottomLeftContentSideSetting
                        }
                      >
                        <View
                          style={
                            styles.contentSectionBottomLeftContentSideProgress
                          }
                        >
                          <Text
                            style={
                              styles.contentSectionBottomLeftContentSideProgressText
                            }
                          >
                            language : Morsmål
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.contentSectionBottomLeftContentSide}>
                      <Text
                        style={styles.contentSectionBottomLeftContentSideTitle}
                      >
                        KURS
                      </Text>
                      <View
                        style={
                          styles.contentSectionBottomLeftContentSideSetting
                        }
                      >
                        <View
                          style={
                            styles.contentSectionBottomLeftContentSideProgress
                          }
                        >
                          <Text
                            style={
                              styles.contentSectionBottomLeftContentSideProgressText
                            }
                          >
                            course name
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.contentSectionBottomLeftContentSide}>
                      <Text
                        style={styles.contentSectionBottomLeftContentSideTitle}
                      >
                        HOBBY
                      </Text>
                      <View
                        style={
                          styles.contentSectionBottomLeftContentSideSetting
                        }
                      >
                        <View
                          style={
                            styles.contentSectionBottomLeftContentSideProgress
                          }
                        >
                          <Text
                            style={
                              styles.contentSectionBottomLeftContentSideProgressText
                            }
                          >
                            cricket
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.contentSectionBottomRight}>
                  <View style={styles.contentSectionBottomRightContent}>
                    <View style={styles.contentSectionBottomLeftContent}>
                      <Text style={styles.contentContainerHeading}>
                        UTDANNELSE
                      </Text>
                      <Text style={styles.contentContainerHeadingLine}></Text>

                      <View style={styles.studingContent}>
                        <View style={styles.settingContent}>
                          <Text style={{ textTransform: 'uppercase' }}>
                            settingg
                          </Text>
                          <Text style={styles.settingContentText}>
                            text for this is a bextay way to a
                          </Text>
                          <View style={styles.settingContentDate}>
                            <Text style={styles.settingContentDateText}>
                              08 2023 - 08 2023
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={styles.contentSectionBottomLeftContent}>
                      <Text style={styles.contentContainerHeading}>
                        Referanser
                      </Text>
                      <Text style={styles.contentContainerHeadingLine}></Text>
                      <View style={styles.studingContent}>
                        <View style={styles.settingContent}>
                          <Text>Navn - Selskap</Text>
                          <Text style={styles.settingContentText}>
                            Telefon: 98514
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default TemplateEleven
