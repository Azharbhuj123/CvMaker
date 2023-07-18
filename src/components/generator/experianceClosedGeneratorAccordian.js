import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import arrowdown from '../../assests/images/arrowdown.png'
import PrimaryInput, { HeadInput } from './primaryInput'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
  Experiance_Data,
  New_Experiance_Data,
} from '../../Redux/reducers/CvGeneratorReducer'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  editNewWorkExperiance,
  editWorkExperiance,
  removeNewWorkExperiance,
  removeWorkExperiance,
} from '../../Redux/actions/CvGeneratorAction'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const ExperianceClosedGeneratorAccordian = ({
  open,
  setOpen,
  title,
  accordianIndex,
  dataType,
}) => {
  const [institute, setInstitute] = useState('')
  const [degree, setDegree] = useState('')
  const [endDate, setEndDate] = useState()
  const [startDate, setStartDate] = useState()
  const [editable, setEditable] = useState(true)
  const [test, setTest] = useState('')
  const dispatch = useDispatch()
  const experiance = useSelector(Experiance_Data)
  const newxEperiance = useSelector(New_Experiance_Data)

  const handleChange = (field, value) => {
    let change = newxEperiance.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        }
      }
      return item
    })
    dispatch(editNewWorkExperiance(change))
  }
  const handleDelete = (id) => {
    dispatch(removeNewWorkExperiance(id))
  }

  return (
    <div className='generator-accordian'>
      <div className='generator-accordian-heading'>
        <span>
          {newxEperiance[accordianIndex]?.jobTitle +
            ' er hos ' +
            newxEperiance[accordianIndex]?.employer}
        </span>
        {/* <img src={arrowdown} alt="arrowdown" /> */}
        <div>
          <Popup
            arrow={false}
            trigger={
              <div>
                <BsThreeDotsVertical />
              </div>
            }
            position='center'
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={() =>
                handleChange(
                  'enableAccordian',
                  !newxEperiance[accordianIndex].enableAccordian
                )
              }
            >
              Rediger tekst
            </div>
            <div
              style={{ color: 'red', cursor: "pointer" }}
              onClick={() => handleDelete(accordianIndex)}
            >
              Slett
            </div>
          </Popup>
        </div>
      </div>
    </div>
  )
}

export default ExperianceClosedGeneratorAccordian
