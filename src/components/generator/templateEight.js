import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
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
  getNewRefToggle,
  getNewAdditionalAccordian,
} from '../../Redux/reducers/CvGeneratorReducer'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import moment from 'moment'
import { useSelector } from 'react-redux'
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
  Dimensions,
} from '@react-pdf/renderer'
import axios from 'axios'
import close from '../../../src/assests/images/circle-xmark.png'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
const TemplateEight = (props) => {
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

  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const hobbies = useSelector(getHobbies)
  const [documnentRef, setDocumentRef] = useState(null)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const profileData = useSelector(profileRichTextData)
  const skillData = useSelector(propertiesData)
  const refrence = useSelector(referenceData)
  const courses = useSelector(coursesData)
  const lanuages = useSelector(languageData)
  const newToggleData = useSelector(getNewRefToggle)
  console.log(documnentRef, 'ttttt')
  console.log(educationData, 'education data')

  const Proceed = () => {
    return (
      <button className='proceed-button' onClick={() => handleModalOpen()}>
        <MdArrowForwardIos />
      </button>
    )
  }

  Font.register({
    family: 'Roboto',
    fonts: [
      { src: robotoRegular },
      { src: robotoBold, fontWeight: 'bold' },
      { src: robotoItalic, fontStyle: 'italic' },
      { src: robotoBoldItalic, fontStyle: 'italic', fontWeight: 'bold' },
    ],
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
      wordBreak: 'break-all',
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
      fontWeight: 'bold',
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
      fontWeight: 700,
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
    experienceSectionContentTextRef: {
      color: '#000',
      fontFamily: 'Roboto',
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

  return (
    <>
      {showButton && <Proceed />}
      {showPDFViewer ? (
        <PDFViewer style={styles.document} showToolbar={false}>
          <Document style={styles.document}>
            <Page size='A4' style={styles.page}>
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
                  <View>
                    <Text style={styles.detailSectionContentAddressText}>
                      {cvData?.email}
                    </Text>
                  </View>

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
                                    marginTop: '15px',
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
                                    marginTop: '3px',
                                    borderBottom:
                                      '2px dotted rgb(177, 156, 125)',
                                  }}
                                ></View>
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
                  </View>{' '}
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
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
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
                {profileData !== '' ? (
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
                ) : null}

                <Text style={styles.experienceSection}>ARBEIDSERFARING</Text>
                <View style={styles.experienceSectionContent}>
                  {experianceData?.map((item, index) => (
                    <>
                      <Text
                        style={styles.experienceSectionContentText}
                        key={index}
                      >
                        {item?.jobTitle + ' - ' + item?.employer}
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
                  return (
                    <View style={styles.experienceSectionContent}>
                      {item?.study ? (
                        <Text
                          style={styles.experienceSectionContentText}
                          keys={index}
                        >
                          {item?.study + ', ' + item?.school}
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
                          <Text style={styles.experienceSectionContentTextRef}>
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
              forplikte deg til å akseptere våre
              <Link to='/gdpr'>
                <span>vilkår og betingelser</span>
              </Link>
              og
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
                        <Text style={styles.detailSectionContentAdress}>
                          By
                        </Text>
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

                      <Text style={styles.detailSectionContentAdress}>
                        E-Post
                      </Text>
                      <View>
                        <Text style={styles.detailSectionContentAddressText}>
                          {cvData?.email}
                        </Text>
                      </View>

                      <Text style={styles.detailSectionContentAdress}>
                        TELEFON
                      </Text>
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
                                        marginTop: '15px',
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
                                        marginTop: '3px',
                                        borderBottom:
                                          '2px dotted rgb(177, 156, 125)',
                                      }}
                                    ></View>
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
                      </View>{' '}
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
                          <View
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            {hobbies?.map((item, index) => (
                              <Text
                                style={styles.languageSectionText}
                                key={index}
                              >
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
                              <Text
                                style={styles.languageSectionText}
                                key={index}
                              >
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

                  <View
                    style={styles.pageRightSection}
                    styles={{ width: '70%' }}
                  >
                    {profileData !== '' ? (
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
                    ) : null}

                    <Text style={styles.experienceSection}>
                      ARBEIDSERFARING
                    </Text>
                    <View style={styles.experienceSectionContent}>
                      {experianceData?.map((item, index) => (
                        <>
                          <Text
                            style={styles.experienceSectionContentText}
                            key={index}
                          >
                            {item?.jobTitle + ' - ' + item?.employer}
                          </Text>
                          <View style={styles.experienceSectionContentDate}>
                            <Text
                              style={styles.experienceSectionContentDateText}
                            >
                              {item.startDate?.length === 0
                                ? 'Startdato -'
                                : moment(item?.startDate).format('YYYY-MM') +
                                  ' - '}
                              {item.toggle
                                ? 'dags dato'
                                : item.endDate.length === 0
                                ? ' Sluttdato'
                                : moment(item?.endDate).format('YYYY-MM')}
                            </Text>
                          </View>
                          <View style={styles.experienceSectionContentPara}>
                            <Text
                              style={styles.experienceSectionContentParaText}
                            >
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
                      return (
                        <View style={styles.experienceSectionContent}>
                          {item?.study ? (
                            <Text
                              style={styles.experienceSectionContentText}
                              keys={index}
                            >
                              {item?.study + ', ' + item?.school}
                            </Text>
                          ) : null}
                          <View style={styles.experienceSectionContentDate}>
                            <Text
                              style={styles.experienceSectionContentDateText}
                            >
                              {item.startDate?.length === 0
                                ? 'Startdato -'
                                : moment(item?.startDate).format('YYYY-MM') +
                                  ' - '}
                              {item.toggle
                                ? 'dags dato'
                                : item.endDate.length === 0
                                ? ' Sluttdato'
                                : moment(item?.endDate).format('YYYY-MM')}
                            </Text>
                          </View>
                          <View style={styles.experienceSectionContentPara}>
                            <Text
                              style={styles.experienceSectionContentParaText}
                            >
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
                        <Text style={styles.experienceSection}>
                          PRAKSISPLASSER
                        </Text>
                        {internships?.map((item, index) => (
                          <View
                            style={styles.experienceSectionContent}
                            keys={index}
                          >
                            <Text style={styles.experienceSectionContentText}>
                              {item?.jobTitle + ' - ' + item?.employer}
                            </Text>
                            <View style={styles.experienceSectionContentDate}>
                              <Text
                                style={styles.experienceSectionContentDateText}
                              >
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
                              <Text
                                style={styles.experienceSectionContentParaText}
                              >
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
                          <View
                            style={styles.experienceSectionContent}
                            key={index}
                          >
                            {newToggleData ? (
                              <Text
                                style={styles.experienceSectionContentTextRef}
                              >
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
                          <Text style={styles.detailSectionContentAdress}>
                            By
                          </Text>
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

                        <Text style={styles.detailSectionContentAdress}>
                          E-Post
                        </Text>
                        <View>
                          <Text style={styles.detailSectionContentAddressText}>
                            {cvData?.email}
                          </Text>
                        </View>

                        <Text style={styles.detailSectionContentAdress}>
                          TELEFON
                        </Text>
                        <Text style={styles.detailSectionContentAddressText}>
                          {cvData?.phone}
                        </Text>

                        {cvData?.DOB == '' ? null : (
                          <>
                            <Text style={styles.detailSectionContentAdress}>
                              FØDSELSDATO
                            </Text>
                            <Text
                              style={styles.detailSectionContentAddressText}
                            >
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
                                          marginTop: '15px',
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
                                          marginTop: '3px',
                                          borderBottom:
                                            '2px dotted rgb(177, 156, 125)',
                                        }}
                                      ></View>
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
                        </View>{' '}
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
                            <View
                              style={{ display: 'flex', flexDirection: 'row' }}
                            >
                              {hobbies?.map((item, index) => (
                                <Text
                                  style={styles.languageSectionText}
                                  key={index}
                                >
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
                                <Text
                                  style={styles.languageSectionText}
                                  key={index}
                                >
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

                    <View
                      style={styles.pageRightSection}
                      styles={{ width: '70%' }}
                    >
                      {profileData !== '' ? (
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
                      ) : null}

                      <Text style={styles.experienceSection}>
                        ARBEIDSERFARING
                      </Text>
                      <View style={styles.experienceSectionContent}>
                        {experianceData?.map((item, index) => (
                          <>
                            <Text
                              style={styles.experienceSectionContentText}
                              key={index}
                            >
                              {item?.jobTitle + ' - ' + item?.employer}
                            </Text>
                            <View style={styles.experienceSectionContentDate}>
                              <Text
                                style={styles.experienceSectionContentDateText}
                              >
                                {item.startDate?.length === 0
                                  ? 'Startdato -'
                                  : moment(item?.startDate).format('YYYY-MM') +
                                    ' - '}
                                {item.toggle
                                  ? 'dags dato'
                                  : item.endDate.length === 0
                                  ? ' Sluttdato'
                                  : moment(item?.endDate).format('YYYY-MM')}
                              </Text>
                            </View>
                            <View style={styles.experienceSectionContentPara}>
                              <Text
                                style={styles.experienceSectionContentParaText}
                              >
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
                        return (
                          <View style={styles.experienceSectionContent}>
                            {item?.study ? (
                              <Text
                                style={styles.experienceSectionContentText}
                                keys={index}
                              >
                                {item?.study + ', ' + item?.school}
                              </Text>
                            ) : null}
                            <View style={styles.experienceSectionContentDate}>
                              <Text
                                style={styles.experienceSectionContentDateText}
                              >
                                {item.startDate?.length === 0
                                  ? 'Startdato -'
                                  : moment(item?.startDate).format('YYYY-MM') +
                                    ' - '}
                                {item.toggle
                                  ? 'dags dato'
                                  : item.endDate.length === 0
                                  ? ' Sluttdato'
                                  : moment(item?.endDate).format('YYYY-MM')}
                              </Text>
                            </View>
                            <View style={styles.experienceSectionContentPara}>
                              <Text
                                style={styles.experienceSectionContentParaText}
                              >
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
                          <Text style={styles.experienceSection}>
                            PRAKSISPLASSER
                          </Text>
                          {internships?.map((item, index) => (
                            <View
                              style={styles.experienceSectionContent}
                              keys={index}
                            >
                              <Text style={styles.experienceSectionContentText}>
                                {item?.jobTitle + ' - ' + item?.employer}
                              </Text>
                              <View style={styles.experienceSectionContentDate}>
                                <Text
                                  style={
                                    styles.experienceSectionContentDateText
                                  }
                                >
                                  {item.startDate.length === 0
                                    ? 'Startdato -'
                                    : moment(item?.startDate).format(
                                        'YYYY-MM'
                                      ) + ' - '}
                                  {item.toggle
                                    ? 'dags dato'
                                    : item.endDate.length === 0
                                    ? 'Sluttdato'
                                    : moment(item?.endDate).format('YYYY-MM')}
                                </Text>
                              </View>
                              <View style={styles.experienceSectionContentPara}>
                                <Text
                                  style={
                                    styles.experienceSectionContentParaText
                                  }
                                >
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
                          <Text style={styles.experienceSection}>
                            REFERANSER
                          </Text>
                          {refrence?.map((item, index) => (
                            <View
                              style={styles.experienceSectionContent}
                              key={index}
                            >
                              {newToggleData ? (
                                <Text
                                  style={styles.experienceSectionContentTextRef}
                                >
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

export default TemplateEight
