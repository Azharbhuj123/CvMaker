import React from 'react'
import cvimg from '../../assests/images/cvformat.png'
import cv1 from '../../assests/images/cv1.jpg'
import cv2 from '../../assests/images/cv2.jpg'
import cv3 from '../../assests/images/cv3.png'
import cv5 from '../../assests/images/cv51.png'
import cv6 from '../../assests/images/cv6.jpg'
import cv9 from '../../assests/images/cv5.jpg'
import cv7 from '../../assests/images/cv7.jpg'
import cv33 from '../../assests/images/cv33.jpg'
import cv8 from '../../assests/images/cv8.png'
import cv10 from '../../assests/images/cv2.jpg'
import cv11 from '../../assests/images/cv11.jpg'
import cv12 from '../../assests/images/cv12.png'
import cv13 from '../../assests/images/cv13.png'
import cv22 from '../../assests/images/cv2.jpg'
import cv55 from '../../assests/images/cv9.png'
import '../../styles/components/cvmaker/cvbodies-modal.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TemplateEight from '../generator/templateEight'
import { Link } from 'react-router-dom'
const CVBodiesModal = () => {
  const navigate = useNavigate()
  const [showTemplateEight, setShowTemplateEight] = useState(false)

  const handleTemplateEightClick = () => {
    setShowTemplateEight(true)
  }

  const handleBackClick = () => {
    setShowTemplateEight(false)
  }

  if (showTemplateEight) {
    return <TemplateEight goBack={handleBackClick} />
  }

  return (
    <div className='cvmaker-modal-container'>
      <div className='cvmaker-modal-container-wrapper'>
        {/* <div className="cvmaker-body-container-wrapper-maindiv">
          <TopHeading heading="Moderne" />
          <TopHeading heading="Klassisk" />
          <TopHeading heading="Profesjonell" />
          <TopHeading heading="Innovativ" />
          <TopHeading heading="Kreativ" />
          <TopHeading heading="Stilren " />
        </div> */}
        <div className='cvmaker-modal-container-wrapper-cvformat'>
          {/* <div
              onClick={() => navigate("/generator/templateone")}
              className="cvmaker-body-container-wrapper-cvformat-maindiv"
            >
              <h1>One</h1>
              <img src={cv1} alt="cvimg" />
              <button>Velg mal</button>
            </div>


            <div
              onClick={() => navigate("/generator/templatetwo")}
              className="cvmaker-body-container-wrapper-cvformat-maindiv"
            >
              <h1>Two</h1>
              <img src={cv22} alt="cvimg" />
              <button>Velg mal</button>
            </div> */}

          <div
            onClick={() => navigate('/generator/mal-1')}
            className='cvmaker-modal-container-wrapper-cvformat-maindiv'
          >
            <h1>1</h1>
            <img src={cv33} alt='cvimg' />
            <button>Velg mal</button>
          </div>
          <Link to='/PdfViewer'>
            <div
              // onClick={() => navigate('/generator/mal-2')}
              // onClick={handleTemplateEightClick}
              className='cvmaker-modal-container-wrapper-cvformat-maindiv'
            >
              <h1>Anbefalt</h1>
              <img src={cv7} alt='cvimg' />

              <button>Velg mal</button>
            </div>
          </Link>

          <div
            onClick={() => navigate('/generator/mal-3')}
            className='cvmaker-modal-container-wrapper-cvformat-maindiv'
          >
            <h1>Anbefalt</h1>
            <img src={cv3} alt='cvimg' />
            <button>Velg mal</button>
          </div>

          <div
            onClick={() => navigate('/generator/mal-4')} ///generator/templatesix
            className='cvmaker-modal-container-wrapper-cvformat-maindiv'
          >
            <h1>Anbefalt</h1>
            <img src={cv11} alt='cvimg' />
            <button>Velg mal</button>
          </div>

          {/* <div
              onClick={() => navigate("/generator/templateseven")}
              className="cvmaker-body-container-wrapper-cvformat-maindiv"
            >
              <h1>Five</h1>
              <img src={cv8} alt="cvimg" />
              <button>Velg mal</button>
            </div> */}

          <div
            onClick={() => navigate('/generator/mal-5')} ///generator/templateeight
            className='cvmaker-modal-container-wrapper-cvformat-maindiv'
          >
            <h1>Anbefalt</h1>
            <img src={cv55} alt='cvimg' />
            <button>Velg mal</button>
          </div>
          <div
            onClick={() => navigate('/generator/mal-6')} ///generator/templatenine
            className='cvmaker-modal-container-wrapper-cvformat-maindiv'
          >
            <h1>6</h1>
            <img src={cv10} alt='cvimg' />
            <button>Velg mal</button>
          </div>
          <div
            onClick={() => navigate('/generator/mal-7')}
            className='cvmaker-modal-container-wrapper-cvformat-maindiv'
          >
            <h1>7</h1>
            <img src={cv9} alt='cvimg' />
            <button>Velg mal</button>
          </div>
          <div
            onClick={() => navigate('/generator/mal-8')}
            className='cvmaker-modal-container-wrapper-cvformat-maindiv'
          >
            <h1>8</h1>
            <img src={cv6} alt='cvimg' />
            <button>Velg mal</button>
          </div>
          {/* <div
              onClick={() => navigate("/generator/templatetwelve")}
              className="cvmaker-body-container-wrapper-cvformat-maindiv"
            >
              <h1>Twelve</h1>
              <img src={cv12} alt="cvimg" />
              <button>Velg mal</button>
            </div>
            <div
              onClick={() => navigate("/generator/templatethirteen")}
              className="cvmaker-body-container-wrapper-cvformat-maindiv"
            >
              <h1>Thirteen</h1>
              <img src={cv13} alt="cvimg" />
              <button>Velg mal</button>
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default CVBodiesModal

export const TopHeading = (props) => {
  const { heading } = props
  return (
    <div className='cvmaker-modal-container-wrapper-maindiv-set'>
      <div className='spanset'>
        <span>Icon</span>
      </div>
      <span>{heading}</span>
    </div>
  )
}
