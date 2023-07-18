import React, { useRef, useEffect, useState } from 'react'
import ProgressBar from './progressBar'
import { FaUserAlt, FaGraduationCap } from 'react-icons/fa'
import { GiSpeaker } from 'react-icons/gi'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ButtonAdornment from '../../assests/icons/buttonAdornment.png'
import BriefCaseIcon from '../../assests/icons/briefcase.png'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { sendFileToBackend } from '../../helper/helperFunctions'
import cap from '../../assests/icons/cap.png'
import person from '../../assests/icons/person.png'
import circle from '../../assests/icons/circle.png'

import { useSelector, useDispatch } from 'react-redux'
import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  sliderData,
  languageData,
  propertiesData,
  coursesData,
  getHobbies,
  getAdditionalAccordian,
  getInternships,
  referenceData,
  profileRichTextData,
  getRefToggle,
  getPresentDate,
  getNewRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import { Editor, EditorState } from 'draft-js'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { takeScreenShot } from '../../Redux/actions/screenShotAction'
import { cvScreenShot } from '../../Redux/reducers/screenShotReducer'
import { FiCircle } from 'react-icons/fi'
import QuillTextEditor2 from '../QuillTextEditor/QuillTextEditor2'
import oswald from '../../assests/fonts/oswald/Oswald-Regular.ttf'
import oswaldBold from '../../assests/fonts/oswald/Oswald-Bold.ttf'
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
import axios from 'axios'

Font.register({
  family: 'Oswald',
  fonts: [{ src: oswald }, { src: oswaldBold }],
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
    padding: 10,
  },
  document: {
    width: '100%',
    height: '100vh',
  },
  headingSection: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    width: '100%',
  },
  headingTitle: {
    color: 'black',
    fontFamily: 'Oswald',
    fontSize: 36,
    fontWeight: 'bold',
  },
  headingsubTitle: {
    gap: 2,
    marginBottom: 12,
    marginTop: 10,
    color: 'grey',
    fontFamily: 'Oswald',
    fontSize: 12,
    fontweight: '900',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    overflowWrap: 'break-word',
    width: '100%',
  },
  contentWrapperLeftSide: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '30%',
    // alignItems: 'center',
  },
  contentWrapperLeftSideContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  contentWrapperLeftSideContentTitle: {
    alignSelf: 'center',
    color: '#000',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    position: 'relative',
    textDecoration: 'none',
  },
  container: {
    display: 'block',
    width: '100%',
  },
  contentWrapperLeftSideContentHead: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 8,
  },
  contentWrapperLeftSideContentText: {
    fontFamily: 'Oswald',
    fontSize: 12,
    textAlign: 'center',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
  },
  contentWrapperLeftSideContentTextMail: {
    fontFamily: 'Oswald',
    fontSize: 12,
    textAlign: 'center',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    borderBottom: '1px solid blue',
    color: 'blue',
  },
  contentWrapperLeftSideContentProgress: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
    width: '100%',
  },
  contentWrapperLeftSideContentProgressTitle: {
    alignSelf: 'center',
    color: '#000',
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    position: 'relative',
    textDecoration: 'none',
    letterSpacing: 2,
  },
  contentWrapperRightSide: {
    paddingLeft: 15,
    width: '70%',
  },
  contentWrapperRightSideWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    position: 'relative',
    width: '90%',
  },
  contentWrapperRightSideWrapperLine: {
    backgroundColor: 'black',
    height: '90%',
    width: '1px',
  },
  contentWrapperRightSideWrapperContent: {
    overflowWrap: 'break-word',
    width: '100%',
  },
  contentWrapperRightSideWrapperContentTitle: {
    color: '#000',
    fontFamily: 'Oswald',
    fontSize: 20,
    fontWeight: 700,
    position: 'relative',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
  contentWrapperRightSideWrapperContentPara: {
    width: '100%',
    fontFamily: 'Oswald',
    overflowWrap: 'break-word',
  },
  contentWrapperRightSideWrapperContentParaText: {
    fontFamily: 'Oswald',
    fontSize: 12,
    fontWeight: 'light',
  },
  contentWrapperRightSideWrapperImage: {
    position: 'absolute',
    left: -7,
    top: '-1%',
    width: 15,
    zIndex: 99,
  },
  contentWrapperRightSideWrapperImageCap: {
    position: 'absolute',
    left: -7,
    top: '-1%',
    width: 17,
    zIndex: 99,
  },
  educationContent: {
    overflowWrap: 'anywhere',
    position: 'relative',
  },
  educationContentFrom: {
    fontFamily: 'Oswald',
    fontSize: 12,
    fontWeight: 700,
  },
  educationContentDate: {
    fontFamily: 'Oswald',
    fontSize: 12,
    fontWeight: 400,
    color: 'grey',
  },
  educationContentDateRef: {
    fontFamily: 'Oswald',
    fontSize: 12,
    fontWeight: 'light',
    color: 'black',
  },
})

const TemplateFive = () => {

  const newToggleData = useSelector(getNewRefToggle)
  let pdfComponent = useRef()
  let printButtonRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [changeOccured, setChangeOccured] = useState(false)
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experiances = useSelector(Experiance_Data)
  const refrence = useSelector(referenceData)
  const courses = useSelector(coursesData)
  const internships = useSelector(getInternships)
  const profileData = useSelector(profileRichTextData)
  const properties = useSelector(propertiesData)
  const languages = useSelector(languageData)

  useEffect(() => {
    if (displayTemplate == true && displayTemplate !== {}) {
      console.log(
        'mobile screen detected the element will directly be printed now !!!!!!!!!!!'
      )

      printButtonRef.current.click()
    }
  }, [displayTemplate])

  return (
    <>
      <PDFViewer style={styles.document} showToolbar={false}>
        <Document style={styles.document}>
          <Page size='A4' style={styles.page}>
            <View style={styles.container}>
              <View style={styles.headingSection}>
                <Text style={styles.headingTitle}>
                  {cvData.firstName + ' ' + cvData.lastName}
                </Text>
                <View style={styles.headingsubTitleDiv}>
                  <Text style={styles.headingsubTitle}>{cvData.jobTitle}</Text>
                </View>
              </View>

              <View style={styles.contentWrapper}>
                <View style={styles.contentWrapperLeftSide}>
                  <View style={styles.contentWrapperLeftSideContent}>
                    <Text style={styles.contentWrapperLeftSideContentTitle}>
                      •DETALJER•
                    </Text>
                    {cvData?.DOB == '' ? null : (
                      <View style={styles.contentWrapperLeftSideContentHead}>
                        <Text style={styles.contentWrapperLeftSideContentText}>
                          {moment(cvData?.DOB).format('DD,MM,YYYY')}
                        </Text>
                      </View>
                    )}

                    <View style={styles.contentWrapperLeftSideContentHead}>
                      <Text style={styles.contentWrapperLeftSideContentText}>
                        {cvData.physicalAddress}
                      </Text>
                    </View>
                    <View style={styles.contentWrapperLeftSideContentHead}>
                      <Text style={styles.contentWrapperLeftSideContentText}>
                        {cvData.zipCode}
                      </Text>
                    </View>
                    <View style={styles.contentWrapperLeftSideContentHead}>
                      <Text style={styles.contentWrapperLeftSideContentText}>
                        {cvData.country}
                      </Text>
                    </View>
                    <View style={styles.contentWrapperLeftSideContentHead}>
                      <Text style={styles.contentWrapperLeftSideContentText}>
                        {cvData.phone === '' ? null : cvData.phone}
                      </Text>
                    </View>
                    <View style={styles.contentWrapperLeftSideContentHead}>
                      <Text
                        style={styles.contentWrapperLeftSideContentTextMail}
                      >
                        {cvData.email}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.contentWrapperLeftSideContentProgress}>
                    <Text
                      style={styles.contentWrapperLeftSideContentProgressTitle}
                    >
                      •FERDIGHETER•
                    </Text>
                    {properties?.map((item, index) => {
                      return (
                        <>
                          <View
                            key={index}
                            style={{
                              width: '100%',
                              textAlign: 'center',
                              fontFamily: 'Oswald',
                              fontWeight: 'bold',
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
                                    backgroundColor: 'rgb(191, 191, 191)',
                                    height: '1px',
                                    marginTop: '5px',
                                  }}
                                >
                                  <View
                                    style={{
                                      width: `${item?.value}%`,
                                      color: 'rgb(57, 57, 57)',
                                      backgroundColor: 'rgb(0, 0, 0)',
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
                            <Text style={{ textAlign: 'center' }}>--</Text>
                          </View>
                        </>
                      )
                    })}
                  </View>
                  {/* </View> */}

                  <View style={styles.contentWrapperLeftSideContent}>
                    <Text style={styles.contentWrapperLeftSideContentTitle}>
                      •
                    </Text>
                  </View>

                  <View style={styles.contentWrapperLeftSideContent}>
                    <Text style={styles.contentWrapperLeftSideContentTitle}>
                      SPRÅK
                    </Text>
                    {languages?.map((item, index) => {
                      return (
                        <>
                          <View
                            style={styles.contentWrapperLeftSideContentHead}
                            key={index}
                          >
                            <Text
                              style={styles.contentWrapperLeftSideContentText}
                            >
                              {item?.name}
                              {item?.value}
                            </Text>
                          </View>
                        </>
                      )
                    })}
                  </View>

                  {accordiansEnabled.Kurs === true ? (
                    <View style={styles.contentWrapperLeftSideContent}>
                      <Text style={styles.contentWrapperLeftSideContentTitle}>
                        KURS
                      </Text>
                      <View style={styles.contentWrapperLeftSideContentHead}>
                        {courses?.map((item, index) => {
                          return (
                            <>
                              <Text
                                style={styles.contentWrapperLeftSideContentText}
                                key={index}
                              >
                                {item?.name}
                              </Text>
                            </>
                          )
                        })}
                      </View>
                    </View>
                  ) : null}

                  {cvData.drivingLicense !== '' ? (
                    <View style={styles.contentWrapperLeftSideContent}>
                      <Text style={styles.contentWrapperLeftSideContentTitle}>
                        Førerkort
                      </Text>
                      <View style={styles.contentWrapperLeftSideContentHead}>
                        <Text style={styles.contentWrapperLeftSideContentText}>
                          {cvData.drivingLicense}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {accordiansEnabled.Hobbyer === true ? (
                    <View style={styles.contentWrapperLeftSideContent}>
                      <Text style={styles.contentWrapperLeftSideContentTitle}>
                        HOBBY
                      </Text>
                      {hobbies?.map((item, index) => {
                        return (
                          <View
                            style={styles.contentWrapperLeftSideContentHead}
                            key={index}
                          >
                            <>
                              <Text
                                style={styles.contentWrapperLeftSideContentText}
                                key={index}
                              >
                                {item?.name}
                              </Text>
                            </>
                          </View>
                        )
                      })}
                    </View>
                  ) : null}
                </View>

                <View style={styles.contentWrapperRightSide}>
                  {profileData !== '' ? (
                    <View style={styles.contentWrapperRightSideWrapper}>
                      {/* <View> */}
                      <Image
                        src={person}
                        style={{
                          width: '15px',
                          height: '15px',
                          // color: 'black',
                          position: 'absolute',
                          left: '-2%',
                          top: '-3%',
                          zIndex: 99,
                        }}
                      />
                      <View
                        style={styles.contentWrapperRightSideWrapperLine}
                      ></View>
                      {/* </View> */}

                      <View
                        style={styles.contentWrapperRightSideWrapperContent}
                      >
                        <Text
                          style={
                            styles.contentWrapperRightSideWrapperContentTitle
                          }
                        >
                          PROFIL
                        </Text>
                        <View
                          style={
                            styles.contentWrapperRightSideWrapperContentPara
                          }
                        >
                          <Text
                            style={
                              styles.contentWrapperRightSideWrapperContentParaText
                            }
                          >
                            {profileData.replace(/(<([^>]+)>)/gi, '')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.contentWrapperRightSideWrapper}>
                    {/* <View> */}
                    <Image
                      style={styles.contentWrapperRightSideWrapperImage}
                      src={BriefCaseIcon}
                      alt='briefcase'
                      // styles={{width: '5px', height: '5px',}}
                    />
                    <View
                      style={styles.contentWrapperRightSideWrapperLine}
                    ></View>
                    {/* </View> */}
                    <View>
                      <Text
                        style={
                          styles.contentWrapperRightSideWrapperContentTitle
                        }
                      >
                        ARBEIDSERFARING
                      </Text>
                      {experiances?.map((item, index) => (
                        <View style={styles.educationContent} key={index}>
                          <Image
                            src={circle}
                            style={{
                              width: '12px',
                              height: '12px',
                              position: 'absolute',
                              left: '-18em',
                              zIndex: 99,
                            }}
                          />
                          <Text style={styles.educationContentFrom}>
                            {item?.jobTitle + ' - ' + item?.employer}
                          </Text>
                          <Text style={styles.educationContentDate}>
                            {item.startDate.length === 0
                              ? 'Startdato -'
                              : moment(item?.startDate).format('MM/YYYY') +
                                ' - '}{' '}
                            {item.toggle
                              ? 'dags dato'
                              : item.endDate.length === 0
                              ? ' Sluttdato'
                              : moment(item?.endDate).format('YYYY-MM')}
                          </Text>

                          <View
                            style={
                              styles.contentWrapperRightSideWrapperContentPara
                            }
                          >
                            <Text
                              style={
                                styles.contentWrapperRightSideWrapperContentParaText
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
                    </View>
                  </View>

                  {accordiansEnabled.Praksisplasser === true ? (
                    <View style={styles.contentWrapperRightSideWrapper}>
                      {/* <View> */}
                      <Image
                        style={styles.contentWrapperRightSideWrapperImageCap}
                        src={cap}
                        alt='cap'
                      />

                      <View
                        style={styles.contentWrapperRightSideWrapperLine}
                      ></View>
                      {/* </View> */}
                      <View>
                        <Text
                          style={
                            styles.contentWrapperRightSideWrapperContentTitle
                          }
                        >
                          Praksisplasser
                        </Text>
                        {internships?.map((item, index) => (
                          <View style={styles.educationContent} key={index}>
                            <Image
                              src={circle}
                              style={{
                                width: '12px',
                                height: '12px',
                                position: 'absolute',
                                left: '-18em',
                                zIndex: 99,
                              }}
                            />
                            <Text style={styles.educationContentFrom}>
                              {item?.jobTitle + ' - ' + item?.employer}
                            </Text>
                            <Text style={styles.educationContentDate}>
                              {item.startDate.length === 0
                                ? 'Startdato -'
                                : moment(item?.startDate).format('MM/YYYY') +
                                  ' - '}{' '}
                              {item.toggle
                                ? 'dags dato'
                                : item.endDate.length === 0
                                ? ' Sluttdato'
                                : moment(item?.endDate).format('YYYY-MM')}
                            </Text>

                            <View
                              style={
                                styles.contentWrapperRightSideWrapperContentPara
                              }
                            >
                              <Text
                                style={
                                  styles.contentWrapperRightSideWrapperContentParaText
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
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.contentWrapperRightSideWrapper}>
                    {/* <View> */}
                    <Image
                      style={styles.contentWrapperRightSideWrapperImageCap}
                      src={cap}
                      alt='cap'
                    />
                    <View
                      style={styles.contentWrapperRightSideWrapperLine}
                    ></View>
                    {/* </View> */}
                    <View>
                      <Text
                        style={
                          styles.contentWrapperRightSideWrapperContentTitle
                        }
                      >
                        UTDANNING
                      </Text>
                      {educationData?.map((item, index) => (
                        <View style={styles.educationContent} key={index}>
                          <Image
                            src={circle}
                            style={{
                              width: '12px',
                              height: '12px',
                              position: 'absolute',
                              left: '-18em',
                              zIndex: 99,
                            }}
                          />
                          <Text style={styles.educationContentFrom}>
                            {item.school}-{item.study}
                          </Text>
                          <Text style={styles.educationContentDate}>
                            {item.startDate.length === 0
                              ? 'Startdato -'
                              : moment(item?.startDate).format('MM/YYYY') +
                                ' - '}{' '}
                            {item.toggle
                              ? 'dags dato'
                              : item.endDate.length === 0
                              ? ' Sluttdato'
                              : moment(item?.endDate).format('YYYY-MM')}
                          </Text>

                          <View
                            style={
                              styles.contentWrapperRightSideWrapperContentPara
                            }
                          >
                            <Text
                              style={
                                styles.contentWrapperRightSideWrapperContentParaText
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
                    </View>
                  </View>

                  {accordiansEnabled.Referanser === true ? (
                    <View style={styles.contentWrapperRightSideWrapper}>
                      {/* <View> */}
                      <View
                        style={styles.contentWrapperRightSideWrapperLine}
                      ></View>
                      {/* </View> */}
                      <View>
                        <Text
                          style={
                            styles.contentWrapperRightSideWrapperContentTitle
                          }
                        >
                          REFERANSER
                        </Text>
                        {/* </View> */}
                        {refrence?.map((item, index) => (
                          <View style={styles.educationContent} key={index}>
                            <Image
                              src={circle}
                              style={{
                                width: '12px',
                                height: '12px',
                                position: 'absolute',
                                left: '-18em',
                                zIndex: 99,
                              }}
                            />
                            {newToggleData ? (
                              <>
                                <Text style={styles.educationContentDateRef}>
                                  Oppgis ved forespørsel
                                </Text>
                              </>
                            ) : (
                              <>
                                <FiCircle
                                  style={{
                                    position: 'absolute',
                                    left: '-1.5rem',
                                    backgroundColor: 'white',
                                  }}
                                />
                                <Text style={styles.educationContentFrom}>
                                  {item?.name + ' , ' + item?.companyName}
                                </Text>
                                <Text style={styles.educationContentDate}>
                                  {item?.email}
                                </Text>
                              </>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
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
          </span>
        </div>
        <PDFDownloadLink
          document={
            <Document style={styles.document}>
              <Page size='A4' style={styles.page}>
                <View style={styles.container}>
                  <View style={styles.headingSection}>
                    <Text style={styles.headingTitle}>
                      {cvData.firstName + ' ' + cvData.lastName}
                    </Text>
                    <View style={styles.headingsubTitleDiv}>
                      <Text style={styles.headingsubTitle}>
                        {cvData.jobTitle}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.contentWrapper}>
                    <View style={styles.contentWrapperLeftSide}>
                      <View style={styles.contentWrapperLeftSideContent}>
                        <Text style={styles.contentWrapperLeftSideContentTitle}>
                          •DETALJER•
                        </Text>
                        {cvData?.DOB == '' ? null : (
                          <View
                            style={styles.contentWrapperLeftSideContentHead}
                          >
                            <Text
                              style={styles.contentWrapperLeftSideContentText}
                            >
                              {moment(cvData?.DOB).format('DD,MM,YYYY')}
                            </Text>
                          </View>
                        )}

                        <View style={styles.contentWrapperLeftSideContentHead}>
                          <Text
                            style={styles.contentWrapperLeftSideContentText}
                          >
                            {cvData.physicalAddress}
                          </Text>
                        </View>
                        <View style={styles.contentWrapperLeftSideContentHead}>
                          <Text
                            style={styles.contentWrapperLeftSideContentText}
                          >
                            {cvData.zipCode}
                          </Text>
                        </View>
                        <View style={styles.contentWrapperLeftSideContentHead}>
                          <Text
                            style={styles.contentWrapperLeftSideContentText}
                          >
                            {cvData.country}
                          </Text>
                        </View>
                        <View style={styles.contentWrapperLeftSideContentHead}>
                          <Text
                            style={styles.contentWrapperLeftSideContentText}
                          >
                            {cvData.phone === '' ? null : cvData.phone}
                          </Text>
                        </View>
                        <View style={styles.contentWrapperLeftSideContentHead}>
                          <Text
                            style={styles.contentWrapperLeftSideContentTextMail}
                          >
                            {cvData.email}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={styles.contentWrapperLeftSideContentProgress}
                      >
                        <Text
                          style={
                            styles.contentWrapperLeftSideContentProgressTitle
                          }
                        >
                          •FERDIGHETER•
                        </Text>
                        {properties?.map((item, index) => {
                          return (
                            <>
                              <View
                                key={index}
                                style={{
                                  width: '100%',
                                  textAlign: 'center',
                                  fontFamily: 'Oswald',
                                  fontWeight: 'bold',
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
                                        backgroundColor: 'rgb(191, 191, 191)',
                                        height: '1px',
                                        marginTop: '5px',
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: `${item?.value}%`,
                                          color: 'rgb(57, 57, 57)',
                                          backgroundColor: 'rgb(0, 0, 0)',
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
                                <Text style={{ textAlign: 'center' }}>--</Text>
                              </View>
                            </>
                          )
                        })}
                      </View>

                      <View style={styles.contentWrapperLeftSideContent}>
                        <Text style={styles.contentWrapperLeftSideContentTitle}>
                          •
                        </Text>
                      </View>

                      <View style={styles.contentWrapperLeftSideContent}>
                        <Text style={styles.contentWrapperLeftSideContentTitle}>
                          SPRÅK
                        </Text>
                        {languages?.map((item, index) => {
                          return (
                            <>
                              <View
                                style={styles.contentWrapperLeftSideContentHead}
                                key={index}
                              >
                                <Text
                                  style={
                                    styles.contentWrapperLeftSideContentText
                                  }
                                >
                                  {item?.name}
                                  {item?.value}
                                </Text>
                              </View>
                            </>
                          )
                        })}
                      </View>

                      {accordiansEnabled.Kurs === true ? (
                        <View style={styles.contentWrapperLeftSideContent}>
                          <Text
                            style={styles.contentWrapperLeftSideContentTitle}
                          >
                            KURS
                          </Text>
                          <View
                            style={styles.contentWrapperLeftSideContentHead}
                          >
                            {courses?.map((item, index) => {
                              return (
                                <>
                                  <Text
                                    style={
                                      styles.contentWrapperLeftSideContentText
                                    }
                                    key={index}
                                  >
                                    {item?.name}
                                  </Text>
                                </>
                              )
                            })}
                          </View>
                        </View>
                      ) : null}

                      {cvData.drivingLicense !== '' ? (
                        <View style={styles.contentWrapperLeftSideContent}>
                          <Text
                            style={styles.contentWrapperLeftSideContentTitle}
                          >
                            Førerkort
                          </Text>
                          <View
                            style={styles.contentWrapperLeftSideContentHead}
                          >
                            <Text
                              style={styles.contentWrapperLeftSideContentText}
                            >
                              {cvData.drivingLicense}
                            </Text>
                          </View>
                        </View>
                      ) : null}

                      {accordiansEnabled.Hobbyer === true ? (
                        <View style={styles.contentWrapperLeftSideContent}>
                          <Text
                            style={styles.contentWrapperLeftSideContentTitle}
                          >
                            HOBBY
                          </Text>
                          {hobbies?.map((item, index) => {
                            return (
                              <View
                                style={styles.contentWrapperLeftSideContentHead}
                                key={index}
                              >
                                <>
                                  <Text
                                    style={
                                      styles.contentWrapperLeftSideContentText
                                    }
                                    key={index}
                                  >
                                    {item?.name}
                                  </Text>
                                </>
                              </View>
                            )
                          })}
                        </View>
                      ) : null}
                    </View>

                    <View style={styles.contentWrapperRightSide}>
                      {profileData !== '' ? (
                        <View style={styles.contentWrapperRightSideWrapper}>
                          <Image
                            src={person}
                            style={{
                              width: '15px',
                              height: '15px',
                              position: 'absolute',
                              left: '-2%',
                              top: '-3%',
                              zIndex: 99,
                            }}
                          />
                          <View
                            style={styles.contentWrapperRightSideWrapperLine}
                          ></View>

                          <View
                            style={styles.contentWrapperRightSideWrapperContent}
                          >
                            <Text
                              style={
                                styles.contentWrapperRightSideWrapperContentTitle
                              }
                            >
                              PROFIL
                            </Text>
                            <View
                              style={
                                styles.contentWrapperRightSideWrapperContentPara
                              }
                            >
                              <Text
                                style={
                                  styles.contentWrapperRightSideWrapperContentParaText
                                }
                              >
                                {profileData.replace(/(<([^>]+)>)/gi, '')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : null}

                      <View style={styles.contentWrapperRightSideWrapper}>
                        <Image
                          style={styles.contentWrapperRightSideWrapperImage}
                          src={BriefCaseIcon}
                          alt='briefcase'
                        />
                        <View
                          style={styles.contentWrapperRightSideWrapperLine}
                        ></View>
                        <View>
                          <Text
                            style={
                              styles.contentWrapperRightSideWrapperContentTitle
                            }
                          >
                            ARBEIDSERFARING
                          </Text>
                          {experiances?.map((item, index) => (
                            <View style={styles.educationContent} key={index}>
                              <Image
                                src={circle}
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  position: 'absolute',
                                  left: '-18em',
                                  zIndex: 99,
                                }}
                              />
                              <Text style={styles.educationContentFrom}>
                                {item?.jobTitle + ' - ' + item?.employer}
                              </Text>
                              <Text style={styles.educationContentDate}>
                                {item.startDate.length === 0
                                  ? 'Startdato -'
                                  : moment(item?.startDate).format('MM/YYYY') +
                                    ' - '}{' '}
                                {item.toggle
                                  ? 'dags dato'
                                  : item.endDate.length === 0
                                  ? ' Sluttdato'
                                  : moment(item?.endDate).format('YYYY-MM')}
                              </Text>

                              <View
                                style={
                                  styles.contentWrapperRightSideWrapperContentPara
                                }
                              >
                                <Text
                                  style={
                                    styles.contentWrapperRightSideWrapperContentParaText
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
                        </View>
                      </View>

                      {accordiansEnabled.Praksisplasser === true ? (
                        <View style={styles.contentWrapperRightSideWrapper}>
                          <Image
                            style={
                              styles.contentWrapperRightSideWrapperImageCap
                            }
                            src={cap}
                            alt='cap'
                          />

                          <View
                            style={styles.contentWrapperRightSideWrapperLine}
                          ></View>
                          <View>
                            <Text
                              style={
                                styles.contentWrapperRightSideWrapperContentTitle
                              }
                            >
                              Praksisplasser
                            </Text>
                            {internships?.map((item, index) => (
                              <View style={styles.educationContent} key={index}>
                                <Image
                                  src={circle}
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    position: 'absolute',
                                    left: '-18em',
                                    zIndex: 99,
                                  }}
                                />
                                <Text style={styles.educationContentFrom}>
                                  {item?.jobTitle + ' - ' + item?.employer}
                                </Text>
                                <Text style={styles.educationContentDate}>
                                  {item.startDate.length === 0
                                    ? 'Startdato -'
                                    : moment(item?.startDate).format(
                                        'MM/YYYY'
                                      ) + ' - '}{' '}
                                  {item.toggle
                                    ? 'dags dato'
                                    : item.endDate.length === 0
                                    ? ' Sluttdato'
                                    : moment(item?.endDate).format('YYYY-MM')}
                                </Text>

                                <View
                                  style={
                                    styles.contentWrapperRightSideWrapperContentPara
                                  }
                                >
                                  <Text
                                    style={
                                      styles.contentWrapperRightSideWrapperContentParaText
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
                          </View>
                        </View>
                      ) : null}

                      <View style={styles.contentWrapperRightSideWrapper}>
                        <Image
                          style={styles.contentWrapperRightSideWrapperImageCap}
                          src={cap}
                          alt='cap'
                        />
                        <View
                          style={styles.contentWrapperRightSideWrapperLine}
                        ></View>
                        <View>
                          <Text
                            style={
                              styles.contentWrapperRightSideWrapperContentTitle
                            }
                          >
                            UTDANNING
                          </Text>
                          {educationData?.map((item, index) => (
                            <View style={styles.educationContent} key={index}>
                              <Image
                                src={circle}
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  position: 'absolute',
                                  left: '-18em',
                                  zIndex: 99,
                                }}
                              />
                              <Text style={styles.educationContentFrom}>
                                {item.school}-{item.study}
                              </Text>
                              <Text style={styles.educationContentDate}>
                                {item.startDate.length === 0
                                  ? 'Startdato -'
                                  : moment(item?.startDate).format('MM/YYYY') +
                                    ' - '}{' '}
                                {item.toggle
                                  ? 'dags dato'
                                  : item.endDate.length === 0
                                  ? ' Sluttdato'
                                  : moment(item?.endDate).format('YYYY-MM')}
                              </Text>

                              <View
                                style={
                                  styles.contentWrapperRightSideWrapperContentPara
                                }
                              >
                                <Text
                                  style={
                                    styles.contentWrapperRightSideWrapperContentParaText
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
                        </View>
                      </View>

                      {accordiansEnabled.Referanser === true ? (
                        <View style={styles.contentWrapperRightSideWrapper}>
                          <View
                            style={styles.contentWrapperRightSideWrapperLine}
                          ></View>
                          <View>
                            <Text
                              style={
                                styles.contentWrapperRightSideWrapperContentTitle
                              }
                            >
                              REFERANSER
                            </Text>
                            {refrence?.map((item, index) => (
                              <View style={styles.educationContent} key={index}>
                                <Image
                                  src={circle}
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    position: 'absolute',
                                    left: '-18em',
                                    zIndex: 99,
                                  }}
                                />
                                {newToggleData ? (
                                  <>
                                    <Text
                                      style={styles.educationContentDateRef}
                                    >
                                      Oppgis ved forespørsel
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    <FiCircle
                                      style={{
                                        position: 'absolute',
                                        left: '-1.5rem',
                                        backgroundColor: 'white',
                                      }}
                                    />
                                    <Text style={styles.educationContentFrom}>
                                      {item?.name + ' , ' + item?.companyName}
                                    </Text>
                                    <Text style={styles.educationContentDate}>
                                      {item?.email}
                                    </Text>
                                  </>
                                )}
                              </View>
                            ))}
                          </View>
                        </View>
                      ) : null}
                    </View>
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
    </>
  )
}

export default TemplateFive
