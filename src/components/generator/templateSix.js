import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import userprofile from '../../assests/images/pr.png'
import { useOutletContext, Link } from 'react-router-dom'
import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  coursesData,
  referenceData,
  languageData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  propertiesData,
  profileRichTextData,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import ReactToPrint from 'react-to-print'
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  PDFViewer,
  Image,
} from '@react-pdf/renderer'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'
import arialRegular from '../../assests/fonts/Arial/arial.ttf'
import profileImg from '../../assests/images/pr.png'

Font.register({
  family: 'Arial',
  fonts: [{ src: arialRegular }],
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
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    overflowWrap: 'break-word',
  },
  headerHeading: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
    overflowWrap: 'break-word',
  },
  headerHeadingTitle: {
    fontFamily: 'Arial',
    fontWeight: 300,
    color: 'rgb(79, 129, 189)',
    fontSize: 32,
    wordBreak: 'break-word',
  },
  headerHeadingJobtitle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerHeadingJobtitleText: {
    fontSize: 14,
    fontFamily: 'Arial',
  },
  headerHeadingOne: {
    fontFamily: 'Arial',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    flex: 1,
  },
  headerHeadingOneLeft: {
    display: 'flex',
    flexDirection: 'column',
    overflowWrap: 'break-word',
  },
  headerHeadingOneLeftText: {
    marginTop: 2,
    fontFamily: 'Arial',
    fontSize: 12,
    overflowWrap: 'break-word',
  },
  headerHeadingOneRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'right',
    overflowWrap: 'break-word',
  },
  headerHeadingImage: {
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: '60%',
    display: 'none',
  },
  profileSection: {
    width: '100%',
    margintop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  profileSectionTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 400,
    color: 'rgb(79, 129, 189)',
    wordBreak: 'break-word',
  },
  profileSectionPara: {
    fontFamily: 'Arial',
    fontSize: 10,
    textTransform: 'uppercase',
    paddingBottom: 30,
    wordBreak: 'break-word',
  },
  contentSection: {
    width: '100%',
    wordBreak: 'break-word',
  },
  contentSectionHeading: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  contentSectionHeadingLeft: {
    display: 'flex',
    width: '35%',
  },
  contentSectionHeadingLeftTitle: {
    fontSize: 20,
    color: 'rgb(79, 129, 189)',
    fontFamily: 'Arial',
  },
  contentSectionHeadingRight: {
    width: '65%',
    borderLeft: '2px solid lightgray',
  },
  contentSectionHeadingLeftText: {
    marginLeft: 8,
    marginTop: 8,
    fontFamily: 'Arial',
    fontWeight: 300,
    fontSize: 14,
  },
  contentSectionHeadingRightText: {
    marginLeft: 15,
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  contentSectionHeadingRightPara: {
    overflowWrap: 'break-word',
  },
  contentSectionHeadingRightParaText: {
    fontFamily: 'Arial',
    fontSize: 12,
    overflowWrap: 'break-word',
    marginLeft: 15,
  },
  contentSectionHeadingRightList: {
    marginLeft: 40,
    fontFamily: 'Arial',
  },
  marker: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: 'black',
    marginRight: 8,
  },
  markerText: {
    fontFamily: 'Arial',
    fontSize: 14,
    wordBreak: 'break-all',
  },
  contentSectionHeadingRightTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentSectionHeadingRightText: {
    fontSize: 12,
    marginLeft: 20,
    fontFamily: 'Arial',
  },
  contentSectionHeadingRightreference: {
    marginLeft: 20,
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
})

const TemplateSix = () => {
  let pdfComponent = useRef()
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let printButtonRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const toggleData = useSelector(getRefToggle)
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const dob = moment(cvData?.DOB).format('DD,MM,YYYY')
  const courses = useSelector(coursesData)
  const refrence = useSelector(referenceData)
  const languages = useSelector(languageData)
  const properties = useSelector(propertiesData)
  const profileData = useSelector(profileRichTextData)
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
      document.getElementsByClassName('function-hook'),
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

  return (
    <PDFViewer style={styles.document}>
      <Document style={styles.document}>
        <Page size='A4' style={styles.page}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerHeading}>
                <Text style={styles.headerHeadingTitle}>
                  {cvData.firstName ? cvData?.firstName + ' ' : 'Your Name'}
                  {cvData.lastName ? cvData?.lastName : ' '}
                </Text>
                <View style={styles.headerHeadingJobtitle}>
                  <Text style={styles.headerHeadingJobtitleText}>
                    {cvData?.jobTitle}
                  </Text>
                </View>
                <View style={styles.headerHeadingOne}>
                  <View style={styles.headerHeadingOneLeft}>
                    {cvData?.DOB == '' ? null : (
                      <Text style={styles.headerHeadingOneLeftText}>
                        Fødselsdato: {moment(cvData?.DOB).format('DD,MM,YYYY')}
                      </Text>
                    )}
                    <Text style={styles.headerHeadingOneLeftText}>
                      Mail: {cvData.email ? cvData.email : 'din epost'}
                    </Text>
                    {cvData?.drivingLicense !== '' ? (
                      <Text style={styles.headerHeadingOneLeftText}>
                        Førerkort: {cvData?.drivingLicense}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.headerHeadingOneRight}>
                    <Text style={styles.headerHeadingOneLeftText}>
                      Telefon: {cvData.phone ? cvData.phone : 'din telefon'}
                    </Text>
                    <Text style={styles.headerHeadingOneLeftText}>
                      Adresse:
                      {cvData.physicalAddress !== ''
                        ? cvData.physicalAddress + ', ' + cvData.zipCode
                        : 'adressen din'}
                    </Text>
                    <Text style={styles.headerHeadingOneLeftText}>
                      {cvData.country !== '' ? cvData.country : null}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.headerHeadingImage}>
                <Image
                  src={cvData.profileImage ? cvData.profileImage : userprofile}
                  alt=''
                  style={cvData.profileImage ? null : { display: 'none' }}
                />
              </View>
            </View>

            {profileData !== '<p><br></p>' && profileData !== '<p></p>' && (
              <View style={styles.profileSection}>
                <Text style={styles.profileSectionTitle}>Profil</Text>
                <Text style={styles.profileSectionPara}>
                  {profileData.replace(/(<([^>]+)>)/gi, '')}
                </Text>
              </View>
            )}

            <View style={styles.contentSection}>
              <View style={styles.contentSectionHeading}>
                <View style={styles.contentSectionHeadingLeft}>
                  <Text style={styles.contentSectionHeadingLeftTitle}>
                    ERFARING
                  </Text>
                </View>
                <View style={styles.contentSectionHeadingRight}></View>
              </View>
              {experianceData.map((item, index) => (
                <View style={styles.contentSectionHeading} key={index}>
                  <View style={styles.contentSectionHeadingLeft}>
                    <Text style={styles.contentSectionHeadingLeftText}>
                      {item.startDate.length === 0
                        ? 'Startdato'
                        : moment(item.startDate).format('YYYY MM')}{' '}
                      {' - '}
                      {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </Text>
                  </View>
                  <View style={styles.contentSectionHeadingRight}>
                    <Text style={styles.contentSectionHeadingRightText}>
                      {item?.jobTitle}, {item?.employer}
                    </Text>
                    <View style={styles.contentSectionHeadingRightPara}>
                      <Text style={styles.contentSectionHeadingRightParaText}>
                        {item.additionalInformation.replace(
                          /(<([^>]+)>)/gi,
                          ''
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              <View style={styles.contentSectionHeading}>
                <View style={styles.contentSectionHeadingLeft}>
                  <Text style={styles.contentSectionHeadingLeftTitle}>
                    UTDANNING
                  </Text>
                </View>
                <View style={styles.contentSectionHeadingRight}></View>
              </View>
              {educationData.map((item, index) => (
                <View style={styles.contentSectionHeading} key={index}>
                  <View style={styles.contentSectionHeadingLeft}>
                    <Text style={styles.contentSectionHeadingLeftText}>
                      {item.startDate.length === 0
                        ? 'Startdato'
                        : moment(item.startDate).format('YYYY MM')}{' '}
                      {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </Text>
                  </View>
                  <View style={styles.contentSectionHeadingRight}>
                    <Text style={styles.contentSectionHeadingRightText}>
                      {item?.study}, {item.school}
                    </Text>
                    <View style={styles.contentSectionHeadingRightPara}>
                      <Text style={styles.contentSectionHeadingRightParaText}>
                        {item.additionalInformation.replace(
                          /(<([^>]+)>)/gi,
                          ''
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              {accordiansEnabled.Praksisplasser === true ? (
                <>
                  <View style={styles.contentSectionHeading}>
                    <View style={styles.contentSectionHeadingLeft}>
                      <Text style={styles.contentSectionHeadingLeftTitle}>
                        PRAKSISPLASSER
                      </Text>
                    </View>
                    <View style={styles.contentSectionHeadingRight}></View>
                  </View>
                  {internships.map((item, index) => {
                    return (
                      <View style={styles.contentSectionHeading} key={index}>
                        <View style={styles.contentSectionHeadingLeft}>
                          <Text style={styles.contentSectionHeadingLeftText}>
                            {moment(item.startDate).format('YYYY MM')} {' - '}
                            {item.toggle
                              ? 'dags dato'
                              : moment(item.endDate).format('YYYY MM')}
                          </Text>
                        </View>
                        <View style={styles.contentSectionHeadingRight}>
                          <Text style={styles.contentSectionHeadingRightText}>
                            {item?.jobTitle} - {item?.employer}
                          </Text>
                          <View style={styles.contentSectionHeadingRightPara}>
                            <Text
                              style={styles.contentSectionHeadingRightParaText}
                            >
                              {item.additionalInformation.replace(
                                /(<([^>]+)>)/gi,
                                ''
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )
                  })}
                </>
              ) : null}

              <View style={styles.contentSectionHeading}>
                <View style={styles.contentSectionHeadingLeft}>
                  <Text style={styles.contentSectionHeadingLeftTitle}>
                    FERDIGHETER
                  </Text>
                </View>
                <View style={styles.contentSectionHeadingRight}></View>
              </View>
              <View style={styles.contentSectionHeading}>
                <View style={styles.contentSectionHeadingLeft}></View>
                <View style={styles.contentSectionHeadingRight}>
                  <View style={styles.contentSectionHeadingRightList}>
                    {properties.map((item, index) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: '5px',
                        }}
                        key={index}
                      >
                        <View style={styles.marker} />
                        <Text style={styles.markerText}>{item.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.contentSectionHeading}>
                <View style={styles.contentSectionHeadingLeft}>
                  <Text style={styles.contentSectionHeadingLeftTitle}>
                    ANNET
                  </Text>
                </View>
                <View style={styles.contentSectionHeadingRight}></View>
              </View>
              <View style={styles.contentSectionHeading}>
                <View style={styles.contentSectionHeadingLeft}></View>
                <View style={styles.contentSectionHeadingRight}>
                  <Text style={styles.contentSectionHeadingRightTitle}>
                    Språk
                  </Text>
                  {languages.map((item, index) => (
                    <Text
                      style={styles.contentSectionHeadingRightText}
                      key={index}
                    >
                      {item.name} {item?.value}
                    </Text>
                  ))}
                </View>
              </View>
              {accordiansEnabled.Hobbyer === true ? (
                <View style={styles.contentSectionHeading}>
                  <View style={styles.contentSectionHeadingLeft}></View>
                  <View style={styles.contentSectionHeadingRight}>
                    <Text style={styles.contentSectionHeadingRightTitle}>
                      Hobby
                    </Text>
                    {hobbies.map((item, index) => (
                      <Text
                        style={styles.contentSectionHeadingRightText}
                        key={index}
                      >
                        {item.name}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}

              {accordiansEnabled.Kurs === true ? (
                <View style={styles.contentSectionHeading}>
                  <View style={styles.contentSectionHeadingLeft}></View>
                  <View style={styles.contentSectionHeadingRight}>
                    <Text style={styles.contentSectionHeadingRightTitle}>
                      Kurs
                    </Text>
                    {courses.map((item, index) => (
                      <Text
                        style={styles.contentSectionHeadingRightText}
                        key={index}
                      >
                        {item.name}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}

              {accordiansEnabled.Referanser === true ? (
                <>
                  <View style={styles.contentSectionHeading}>
                    <View style={styles.contentSectionHeadingLeft}>
                      <Text style={styles.contentSectionHeadingLeftTitle}>
                        REFERANSE
                      </Text>
                    </View>
                    <View style={styles.contentSectionHeadingRight}></View>
                  </View>
                  {refrence.map((item, index) => (
                    <View style={styles.contentSectionHeading} key={index}>
                      <View style={styles.contentSectionHeadingLeft}></View>
                      <Text
                        style={styles.contentSectionHeadingLeftTitle}
                      ></Text>
                      <View style={styles.contentSectionHeadingRight}>
                        {toggleData ? (
                          <Text style={styles.contentSectionHeadingRightText}>
                            Oppgis ved forespørsel
                          </Text>
                        ) : (
                          <>
                            <Text style={styles.contentSectionHeadingRightText}>
                              {item?.name} - {item?.companyName}
                            </Text>
                            <Text style={styles.contentSectionHeadingRightText}>
                              {item?.email}
                            </Text>
                          </>
                        )}
                      </View>
                    </View>
                  ))}
                </>
              ) : null}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default TemplateSix
