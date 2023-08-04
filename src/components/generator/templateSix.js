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
  getNewRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  PDFViewer,
  Image,
  PDFDownloadLink,
} from '@react-pdf/renderer'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import arialRegular from '../../assests/fonts/Arial/arial.ttf'
import arialBold from '../../assests/fonts/Arial/Arial-bold.ttf'
import axios from 'axios'
import close from '../../../src/assests/images/circle-xmark.png'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'


const TemplateSix = () => {
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let printButtonRef = useRef()
  const newToggleData = useSelector(getNewRefToggle)
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
    family: 'Arial',
    fonts: [{ src: arialRegular }, { src: arialBold }],
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
      marginTop: 14,
      overflowWrap: 'break-word',
    },
    headerHeadingTitle: {
      fontFamily: 'Arial',
      fontWeight: 300,
      color: 'rgb(79, 129, 189)',
      fontSize: 30,
      wordBreak: 'break-word',
    },
    headerHeadingJobtitle: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerHeadingJobtitleText: {
      fontSize: 13,
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
      fontSize: 11,
      overflowWrap: 'break-word',
      fontWeight: 'light',
    },
    headerHeadingOneRight: {
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'right',
      overflowWrap: 'break-word',
    },
    headerHeadingImage: {
      width: 100,
      height: 100,
      borderRadius: '60%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
    },
    profileSection: {
      width: '100%',
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    profileSectionTitle: {
      textTransform: 'uppercase',
      fontFamily: 'Arial',
      fontSize: 18,
      fontWeight: 'light',
      color: 'rgb(79, 129, 189)',
      wordBreak: 'break-word',
    },
    profileSectionPara: {
      fontFamily: 'Arial',
      fontSize: 9,
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
      fontSize: 18,
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
      marginLeft: 14,
      marginTop: 8,
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 700,
    },
    contentSectionHeadingRightTextToggle: {
      marginLeft: 14,
      marginTop: 8,
      fontSize: 11,
      fontFamily: 'Arial',
    },
    sparkSectionHeadingRightText: {
      marginLeft: 14,
      fontSize: 12,
      fontFamily: 'Arial',
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
      backgroundColor: 'white',
      border: '1px solid black',
      marginRight: 8,
    },
    markerText: {
      fontFamily: 'Arial',
      fontSize: 12,
      wordBreak: 'break-all',
    },
    contentSectionHeadingRightTitle: {
      marginLeft: 14,
      marginTop: 10,
      fontFamily: 'Arial',
      fontSize: 16,
      fontWeight: 'bold',
    },
    contentSectionHeadingRightreference: {
      marginLeft: 20,
      marginTop: 30,
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 'bold',
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
                            Fødselsdato:{' '}
                            {moment(cvData?.DOB).format('DD,MM,YYYY')}
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

                      {/* <Text> */}
                      <View style={styles.headerHeadingOneRight}>
                        <Text style={styles.headerHeadingOneLeftText}>
                          Telefon: {cvData.phone ? cvData.phone : 'din telefon'}
                        </Text>
                        <Text style={styles.headerHeadingOneLeftText}>
                          Adresse:{' '}
                          {cvData.physicalAddress !== ''
                            ? cvData.physicalAddress + ', ' + cvData.zipCode
                            : 'adressen din'}
                        </Text>
                        <Text style={styles.headerHeadingOneLeftText}>
                          {cvData.country !== '' ? cvData.country : null}
                        </Text>
                      </View>
                      {/* </Text> */}
                    </View>
                  </View>

                  <View style={styles.headerHeadingImage}>
                    <Image
                      src={
                        cvData.profileImage ? cvData.profileImage : userprofile
                      }
                      alt=''
                      style={
                        cvData.profileImage
                          ? {
                              borderRadius: '60%',
                              height: '100%',
                              width: '100%',
                            }
                          : { display: 'none' }
                      }
                    />
                  </View>
                </View>

                {profileData !== '' ? (
                  <View style={styles.profileSection}>
                    <Text style={styles.profileSectionTitle}>Profil</Text>
                    <Text style={styles.profileSectionPara}>
                      {profileData.replace(/(<([^>]+)>)/gi, '')}
                    </Text>
                  </View>
                ) : null}

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
                          <View
                            style={styles.contentSectionHeading}
                            key={index}
                          >
                            <View style={styles.contentSectionHeadingLeft}>
                              <Text
                                style={styles.contentSectionHeadingLeftText}
                              >
                                {moment(item.startDate).format('YYYY MM')}{' '}
                                {' - '}
                                {item.toggle
                                  ? 'dags dato'
                                  : moment(item.endDate).format('YYYY MM')}
                              </Text>
                            </View>
                            <View style={styles.contentSectionHeadingRight}>
                              <Text
                                style={styles.contentSectionHeadingRightText}
                              >
                                {item?.jobTitle} - {item?.employer}
                              </Text>
                              <View
                                style={styles.contentSectionHeadingRightPara}
                              >
                                <Text
                                  style={
                                    styles.contentSectionHeadingRightParaText
                                  }
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
                          style={styles.sparkSectionHeadingRightText}
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
                            style={styles.sparkSectionHeadingRightText}
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
                            style={styles.sparkSectionHeadingRightText}
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
                            {newToggleData ? (
                              <Text
                                style={
                                  styles.contentSectionHeadingRightTextToggle
                                }
                              >
                                Oppgis ved forespørsel
                              </Text>
                            ) : (
                              <>
                                <Text
                                  style={styles.contentSectionHeadingRightText}
                                >
                                  {item?.name} - {item?.companyName}
                                </Text>
                                <Text
                                  style={styles.sparkSectionHeadingRightText}
                                >
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
                      <View style={styles.headerHeading}>
                        <Text style={styles.headerHeadingTitle}>
                          {cvData.firstName
                            ? cvData?.firstName + ' '
                            : 'Your Name'}
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
                                Fødselsdato:{' '}
                                {moment(cvData?.DOB).format('DD,MM,YYYY')}
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

                          {/* <Text> */}
                          <View style={styles.headerHeadingOneRight}>
                            <Text style={styles.headerHeadingOneLeftText}>
                              Telefon:{' '}
                              {cvData.phone ? cvData.phone : 'din telefon'}
                            </Text>
                            <Text style={styles.headerHeadingOneLeftText}>
                              Adresse:{' '}
                              {cvData.physicalAddress !== ''
                                ? cvData.physicalAddress + ', ' + cvData.zipCode
                                : 'adressen din'}
                            </Text>
                            <Text style={styles.headerHeadingOneLeftText}>
                              {cvData.country !== '' ? cvData.country : null}
                            </Text>
                          </View>
                          {/* </Text> */}
                        </View>
                      </View>

                      <View style={styles.headerHeadingImage}>
                        <Image
                          src={
                            cvData.profileImage
                              ? cvData.profileImage
                              : userprofile
                          }
                          alt=''
                          style={
                            cvData.profileImage
                              ? {
                                  borderRadius: '60%',
                                  height: '100%',
                                  width: '100%',
                                }
                              : { display: 'none' }
                          }
                        />
                      </View>
                    </View>

                    {profileData !== '' ? (
                      <View style={styles.profileSection}>
                        <Text style={styles.profileSectionTitle}>Profil</Text>
                        <Text style={styles.profileSectionPara}>
                          {profileData.replace(/(<([^>]+)>)/gi, '')}
                        </Text>
                      </View>
                    ) : null}

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
                              <Text
                                style={
                                  styles.contentSectionHeadingRightParaText
                                }
                              >
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
                              <Text
                                style={
                                  styles.contentSectionHeadingRightParaText
                                }
                              >
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
                              <Text
                                style={styles.contentSectionHeadingLeftTitle}
                              >
                                PRAKSISPLASSER
                              </Text>
                            </View>
                            <View
                              style={styles.contentSectionHeadingRight}
                            ></View>
                          </View>
                          {internships.map((item, index) => {
                            return (
                              <View
                                style={styles.contentSectionHeading}
                                key={index}
                              >
                                <View style={styles.contentSectionHeadingLeft}>
                                  <Text
                                    style={styles.contentSectionHeadingLeftText}
                                  >
                                    {moment(item.startDate).format('YYYY MM')}{' '}
                                    {' - '}
                                    {item.toggle
                                      ? 'dags dato'
                                      : moment(item.endDate).format('YYYY MM')}
                                  </Text>
                                </View>
                                <View style={styles.contentSectionHeadingRight}>
                                  <Text
                                    style={
                                      styles.contentSectionHeadingRightText
                                    }
                                  >
                                    {item?.jobTitle} - {item?.employer}
                                  </Text>
                                  <View
                                    style={
                                      styles.contentSectionHeadingRightPara
                                    }
                                  >
                                    <Text
                                      style={
                                        styles.contentSectionHeadingRightParaText
                                      }
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
                                <Text style={styles.markerText}>
                                  {item.name}
                                </Text>
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
                              style={styles.sparkSectionHeadingRightText}
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
                            <Text
                              style={styles.contentSectionHeadingRightTitle}
                            >
                              Hobby
                            </Text>
                            {hobbies.map((item, index) => (
                              <Text
                                style={styles.sparkSectionHeadingRightText}
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
                            <Text
                              style={styles.contentSectionHeadingRightTitle}
                            >
                              Kurs
                            </Text>
                            {courses.map((item, index) => (
                              <Text
                                style={styles.sparkSectionHeadingRightText}
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
                              <Text
                                style={styles.contentSectionHeadingLeftTitle}
                              >
                                REFERANSE
                              </Text>
                            </View>
                            <View
                              style={styles.contentSectionHeadingRight}
                            ></View>
                          </View>
                          {refrence.map((item, index) => (
                            <View
                              style={styles.contentSectionHeading}
                              key={index}
                            >
                              <View
                                style={styles.contentSectionHeadingLeft}
                              ></View>
                              <Text
                                style={styles.contentSectionHeadingLeftTitle}
                              ></Text>
                              <View style={styles.contentSectionHeadingRight}>
                                {newToggleData ? (
                                  <Text
                                    style={
                                      styles.contentSectionHeadingRightTextToggle
                                    }
                                  >
                                    Oppgis ved forespørsel
                                  </Text>
                                ) : (
                                  <>
                                    <Text
                                      style={
                                        styles.contentSectionHeadingRightText
                                      }
                                    >
                                      {item?.name} - {item?.companyName}
                                    </Text>
                                    <Text
                                      style={
                                        styles.sparkSectionHeadingRightText
                                      }
                                    >
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
                    <View style={styles.container}>
                      <View style={styles.header}>
                        <View style={styles.headerHeading}>
                          <Text style={styles.headerHeadingTitle}>
                            {cvData.firstName
                              ? cvData?.firstName + ' '
                              : 'Your Name'}
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
                                  Fødselsdato:{' '}
                                  {moment(cvData?.DOB).format('DD,MM,YYYY')}
                                </Text>
                              )}
                              <Text style={styles.headerHeadingOneLeftText}>
                                Mail:{' '}
                                {cvData.email ? cvData.email : 'din epost'}
                              </Text>
                              {cvData?.drivingLicense !== '' ? (
                                <Text style={styles.headerHeadingOneLeftText}>
                                  Førerkort: {cvData?.drivingLicense}
                                </Text>
                              ) : null}
                            </View>

                            {/* <Text> */}
                            <View style={styles.headerHeadingOneRight}>
                              <Text style={styles.headerHeadingOneLeftText}>
                                Telefon:{' '}
                                {cvData.phone ? cvData.phone : 'din telefon'}
                              </Text>
                              <Text style={styles.headerHeadingOneLeftText}>
                                Adresse:{' '}
                                {cvData.physicalAddress !== ''
                                  ? cvData.physicalAddress +
                                    ', ' +
                                    cvData.zipCode
                                  : 'adressen din'}
                              </Text>
                              <Text style={styles.headerHeadingOneLeftText}>
                                {cvData.country !== '' ? cvData.country : null}
                              </Text>
                            </View>
                            {/* </Text> */}
                          </View>
                        </View>

                        <View style={styles.headerHeadingImage}>
                          <Image
                            src={
                              cvData.profileImage
                                ? cvData.profileImage
                                : userprofile
                            }
                            alt=''
                            style={
                              cvData.profileImage
                                ? {
                                    borderRadius: '60%',
                                    height: '100%',
                                    width: '100%',
                                  }
                                : { display: 'none' }
                            }
                          />
                        </View>
                      </View>

                      {profileData !== '' ? (
                        <View style={styles.profileSection}>
                          <Text style={styles.profileSectionTitle}>Profil</Text>
                          <Text style={styles.profileSectionPara}>
                            {profileData.replace(/(<([^>]+)>)/gi, '')}
                          </Text>
                        </View>
                      ) : null}

                      <View style={styles.contentSection}>
                        <View style={styles.contentSectionHeading}>
                          <View style={styles.contentSectionHeadingLeft}>
                            <Text style={styles.contentSectionHeadingLeftTitle}>
                              ERFARING
                            </Text>
                          </View>
                          <View
                            style={styles.contentSectionHeadingRight}
                          ></View>
                        </View>
                        {experianceData.map((item, index) => (
                          <View
                            style={styles.contentSectionHeading}
                            key={index}
                          >
                            <View style={styles.contentSectionHeadingLeft}>
                              <Text
                                style={styles.contentSectionHeadingLeftText}
                              >
                                {item.startDate.length === 0
                                  ? 'Startdato'
                                  : moment(item.startDate).format(
                                      'YYYY MM'
                                    )}{' '}
                                {' - '}
                                {item.toggle
                                  ? 'dags dato'
                                  : item.endDate.length === 0
                                  ? ' Sluttdato'
                                  : moment(item?.endDate).format('YYYY-MM')}
                              </Text>
                            </View>
                            <View style={styles.contentSectionHeadingRight}>
                              <Text
                                style={styles.contentSectionHeadingRightText}
                              >
                                {item?.jobTitle}, {item?.employer}
                              </Text>
                              <View
                                style={styles.contentSectionHeadingRightPara}
                              >
                                <Text
                                  style={
                                    styles.contentSectionHeadingRightParaText
                                  }
                                >
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
                          <View
                            style={styles.contentSectionHeadingRight}
                          ></View>
                        </View>
                        {educationData.map((item, index) => (
                          <View
                            style={styles.contentSectionHeading}
                            key={index}
                          >
                            <View style={styles.contentSectionHeadingLeft}>
                              <Text
                                style={styles.contentSectionHeadingLeftText}
                              >
                                {item.startDate.length === 0
                                  ? 'Startdato'
                                  : moment(item.startDate).format(
                                      'YYYY MM'
                                    )}{' '}
                                {item.toggle
                                  ? 'dags dato'
                                  : item.endDate.length === 0
                                  ? ' Sluttdato'
                                  : moment(item?.endDate).format('YYYY-MM')}
                              </Text>
                            </View>
                            <View style={styles.contentSectionHeadingRight}>
                              <Text
                                style={styles.contentSectionHeadingRightText}
                              >
                                {item?.study}, {item.school}
                              </Text>
                              <View
                                style={styles.contentSectionHeadingRightPara}
                              >
                                <Text
                                  style={
                                    styles.contentSectionHeadingRightParaText
                                  }
                                >
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
                                <Text
                                  style={styles.contentSectionHeadingLeftTitle}
                                >
                                  PRAKSISPLASSER
                                </Text>
                              </View>
                              <View
                                style={styles.contentSectionHeadingRight}
                              ></View>
                            </View>
                            {internships.map((item, index) => {
                              return (
                                <View
                                  style={styles.contentSectionHeading}
                                  key={index}
                                >
                                  <View
                                    style={styles.contentSectionHeadingLeft}
                                  >
                                    <Text
                                      style={
                                        styles.contentSectionHeadingLeftText
                                      }
                                    >
                                      {moment(item.startDate).format('YYYY MM')}{' '}
                                      {' - '}
                                      {item.toggle
                                        ? 'dags dato'
                                        : moment(item.endDate).format(
                                            'YYYY MM'
                                          )}
                                    </Text>
                                  </View>
                                  <View
                                    style={styles.contentSectionHeadingRight}
                                  >
                                    <Text
                                      style={
                                        styles.contentSectionHeadingRightText
                                      }
                                    >
                                      {item?.jobTitle} - {item?.employer}
                                    </Text>
                                    <View
                                      style={
                                        styles.contentSectionHeadingRightPara
                                      }
                                    >
                                      <Text
                                        style={
                                          styles.contentSectionHeadingRightParaText
                                        }
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
                          <View
                            style={styles.contentSectionHeadingRight}
                          ></View>
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
                                  <Text style={styles.markerText}>
                                    {item.name}
                                  </Text>
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
                          <View
                            style={styles.contentSectionHeadingRight}
                          ></View>
                        </View>
                        <View style={styles.contentSectionHeading}>
                          <View style={styles.contentSectionHeadingLeft}></View>
                          <View style={styles.contentSectionHeadingRight}>
                            <Text
                              style={styles.contentSectionHeadingRightTitle}
                            >
                              Språk
                            </Text>
                            {languages.map((item, index) => (
                              <Text
                                style={styles.sparkSectionHeadingRightText}
                                key={index}
                              >
                                {item.name} {item?.value}
                              </Text>
                            ))}
                          </View>
                        </View>
                        {accordiansEnabled.Hobbyer === true ? (
                          <View style={styles.contentSectionHeading}>
                            <View
                              style={styles.contentSectionHeadingLeft}
                            ></View>
                            <View style={styles.contentSectionHeadingRight}>
                              <Text
                                style={styles.contentSectionHeadingRightTitle}
                              >
                                Hobby
                              </Text>
                              {hobbies.map((item, index) => (
                                <Text
                                  style={styles.sparkSectionHeadingRightText}
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
                            <View
                              style={styles.contentSectionHeadingLeft}
                            ></View>
                            <View style={styles.contentSectionHeadingRight}>
                              <Text
                                style={styles.contentSectionHeadingRightTitle}
                              >
                                Kurs
                              </Text>
                              {courses.map((item, index) => (
                                <Text
                                  style={styles.sparkSectionHeadingRightText}
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
                                <Text
                                  style={styles.contentSectionHeadingLeftTitle}
                                >
                                  REFERANSE
                                </Text>
                              </View>
                              <View
                                style={styles.contentSectionHeadingRight}
                              ></View>
                            </View>
                            {refrence.map((item, index) => (
                              <View
                                style={styles.contentSectionHeading}
                                key={index}
                              >
                                <View
                                  style={styles.contentSectionHeadingLeft}
                                ></View>
                                <Text
                                  style={styles.contentSectionHeadingLeftTitle}
                                ></Text>
                                <View style={styles.contentSectionHeadingRight}>
                                  {newToggleData ? (
                                    <Text
                                      style={
                                        styles.contentSectionHeadingRightTextToggle
                                      }
                                    >
                                      Oppgis ved forespørsel
                                    </Text>
                                  ) : (
                                    <>
                                      <Text
                                        style={
                                          styles.contentSectionHeadingRightText
                                        }
                                      >
                                        {item?.name} - {item?.companyName}
                                      </Text>
                                      <Text
                                        style={
                                          styles.sparkSectionHeadingRightText
                                        }
                                      >
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

export default TemplateSix
