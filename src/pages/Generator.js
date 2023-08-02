import React, { useState, useRef, useEffect, createRef } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import CvForm from '../components/generator/cvForm'
import { useSelector, useDispatch } from 'react-redux'
import { MdArrowForwardIos } from 'react-icons/md'
import { MdArrowBackIosNew } from 'react-icons/md'
import { CV_DATA, configData } from '../Redux/reducers/CvGeneratorReducer'
import { Outlet } from 'react-router-dom'
import { editConfig } from '../Redux/actions/CvGeneratorAction'
import { cvGenerator } from '../Redux/actions/CvGeneratorAction'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Generator = (props) => {
  // const { cvName, setCvName } = props;
  const cvData = useSelector(CV_DATA)
  const dispatch = useDispatch()
  const [editor, setEditorState] = useState({})
  const [displayTemplate, setDisplayTemplate] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [pageWidth, setPageWidth] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const config = useSelector(configData)
  const MySwal = withReactContent(Swal)

  if (config.footerEnabler === true) {
    dispatch(editConfig({ footerEnabler: false }))
  }
  let resizeWindow = () => {
    setWindowWidth(window.screen.width)
  }

  useEffect(() => {
    resizeWindow()
  }, [windowWidth])

  const changeBasicInfo = (value, field) => {
    dispatch(cvGenerator({ ...cvData, [field]: value }))
  }

  const onEditChange = (editText) => {
    setEditorState(editText)
    localStorage.setItem('editorText', JSON.stringify(editText))
  }

  const alertFunction = () => {
    MySwal.fire({
      title: 'Vilkår og betingelser',
      input: 'checkbox',
      inputValue: 1,
      showCloseButton: true,
      confirmButtonColor: '#eeb856',

      inputPlaceholder: `Ved å trykke på laste ned, vil du laste ned CVen du har laget forplikte deg til å akseptere våre <a  href="/gdpr">vilkår og betingelser</a> og <a  href="/gdpr">personvernregler</a> <br>  <span style={{paddingTop:"1rem"}}>Om den ikke vil laste ned, last inn siden på nytt så fungerer det</span>`,
      confirmButtonText: 'Fortsette <i class="fa fa-arrow-right"></i>',

      inputValidator: (result) => {
        return !result && 'Du må godta Vilkår og betingelser'
      },
    }).then((result) => {
      // if (result.isConfirmed) {
      //   setDisplayTemplate(!displayTemplate)
      // }
    })
  }

  return (
    <>
      {windowWidth > 768 ? (
        <div className='generator'>
          <div className='generator-container'>
            <div className='generator-container-left'>
              <div className='generator-container-left-header'>
                <div style={{ paddingRight: '20px' }}>
                  <Link to='/maler'>
                    <div className='generator-container-left-header-button'>
                      Tilbake
                    </div>
                  </Link>
                </div>
                <input
                  value={cvData.saveAs}
                  className='generator-container-left-header-custom-input'
                  type='text'
                  placeholder='
                    Skriv inn CV-navn'
                  onChange={(e) => {
                    changeBasicInfo(e.target.value, 'saveAs')
                  }}
                ></input>
                <p>
                  Sist endret:{' '}
                  {moment(cvData?.lastModified).format('DD MM YYYY')}
                </p>
              </div>

              <div>
                <div className='generator-container-left-content'>
                  <CvForm editorState={editor} setEditorState={onEditChange} />

                  {/* <ConnectedEditor /> */}
                </div>
              </div>
            </div>
            <div className='generator-container-right'>
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <img src={ArrowLeft} alt="left-arrow"></img>
                <p
                  style={{
                    fontSize: "12px",
                    padding: "0px 5px",
                    fontWeight: "bolder",
                  }}
                >
                  1/1
                </p>
                <img src={ArrowRight} alt="right-arrow"></img>
              </div> */}
              <Outlet
                context={[editor, onEditChange, pageWidth, setPageWidth]}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='generator'>
          {/* <button
            className='proceed-button'
            onClick={() => {
              alertFunction()
            }}
          >
            {displayTemplate ? <MdArrowBackIosNew /> : <MdArrowForwardIos />}
          </button> */}
          <div style={{ display: 'relative' }} className='generator-container'>
            <div
              className='generator-container-left'
              style={{
                display: displayTemplate === false ? 'flex' : 'none',
                width: displayTemplate ? '0%' : '100%',
              }}
            >
              <div className='generator-container-left-header'>
                <Link to='/maler'>
                  <div className='generator-container-left-header-button-mobile'>
                    Tilbake
                  </div>
                </Link>
                <input
                  value={cvData.saveAs}
                  className='generator-container-left-header-custom-input-mobile'
                  type='text'
                  placeholder='
                  -
                    Skriv inn CV-navn'
                  onChange={(e) => {
                    changeBasicInfo(e.target.value, 'saveAs')
                  }}
                ></input>
                <p>
                  Sist endret:{' '}
                  {moment(cvData?.lastModified).format('DD MM YYYY')}
                </p>
              </div>

              <div style={{ width: '100%' }}>
                <div
                  style={{
                    display: displayTemplate === false ? 'flex' : 'none',
                  }}
                  className='generator-container-left-content'
                >
                  <CvForm
                    editorState={editor}
                    setEditorState={setEditorState}
                  />
                  {/* <ConnectedEditor /> */}
                </div>
              </div>
            </div>
            <div
              // style={{
              //   display: displayTemplate ? 'flex' : 'none',
              //   width: displayTemplate ? '100%' : '0%',
              //   height: displayTemplate ? '100%' : '0%',
              // }}
              className='generator-container-right'
            >
              <Outlet
                context={[
                  displayTemplate,
                  setDisplayTemplate,
                  pageWidth,
                  setPageWidth,
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Generator
