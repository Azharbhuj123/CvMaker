import React, { useState } from 'react'
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { CalendarContainer } from 'react-datepicker'
import arrowdown from '../../assests/images/arrowdown.png'
import PrimaryInput, { HeadInput } from './primaryInput'
import Toggle from 'react-toggle'
import Switch from 'react-switch'
import { BiCalendarAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
  Education_DATA,
  Experiance_Data,
  getInternships,
  getPresentDate,
} from '../../Redux/reducers/CvGeneratorReducer'
import {
  addEducationData,
  datePresent,
  editEducation,
  removeEducationData,
  updateEducationToggle,
  addIn
} from '../../Redux/actions/CvGeneratorAction'
import { forwardRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import QuillTextEditor3 from '../QuillTextEditor/QuillTextEditor3'

const GeneratorAccordian = ({
  open,
  setOpen,
  title,
  accordianIndex,
  headings,
}) => {
  const [institute, setInstitute] = useState('')
  const [degree, setDegree] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [abc, setAbc] = useState('')
  const [editable, setEditable] = useState(true)
  const [toggleValue, setToggleValue] = useState(false)
  const [test, setTest] = useState('')
  const dispatch = useDispatch()
  let education = useSelector(Education_DATA)
  let experiance = useSelector(Experiance_Data)
  const presentDate = useSelector(getPresentDate)
  const handleAdd = () => {
    if (education.length < 3) {
      dispatch(
        addEducationData({
          id: Math.floor(Math.random() * 1000),
          institute: institute,
          degree: degree,
          startDate: `${moment(startDate).format('MMM YYYY')}`,
          endDate: `${moment(endDate).format('MMM YYYY')}`,
          toggle: false,
        })
      )

      setDegree('')
      setInstitute('')
      setStartDate('')
      setEndDate('')
    } else {
      console.log('Only 3 add')
    }
  }
  const handleRemove = (id) => {
    dispatch(removeEducationData(id))
  }

  const handleEdit = (id) => {
    setEditable(false)
  }
  const handleChange = (field, value) => {
    let change = education.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        }
      }
      return item
    })
    dispatch(editEducation(change))
  }

  const onToggleChange = (nextChecked) => {
    dispatch(updateEducationToggle({ accordianIndex, nextChecked }))
  }

  const CustomInput = forwardRef((props, ref) => {
    return (
      <div className='custominputdiv'>
        <label onClick={props.onClick} ref={ref}>
          {props.value || props.placeholder}
        </label>
        <div className='custominputdiv-iconsdiv'>
          <BiCalendarAlt size={15} onClick={props.onClick} />
        </div>
      </div>
    )
  })

  return (
    <div className='generator-accordian'>
      <div className='generator-accordian-heading'>
        <span>{headings.heading}</span>
        <img
          src={arrowdown}
          alt='arrowdown'
          onClick={() =>
            handleChange(
              'enableAccordian',
              !education[accordianIndex].enableAccordian
            )
          }
        />
      </div>

      <div className='generator-accordian-textfields'>
        <HeadInput
          value={education[accordianIndex]?.school}
          onChange={(e) => handleChange('school', e.target.value)}
          heading={headings.field1}
          inputPlaceholder={headings.field1}
        />
        <HeadInput
          value={education[accordianIndex]?.study}
          onChange={(e) => handleChange('study', e.target.value)}
          accordianIndex={accordianIndex}
          heading={headings.field2}
          inputPlaceholder={headings.field2}
        />
      </div>
      <div className='generator-accordian-inputanddate'>
        <HeadInput
          value={education[accordianIndex]?.location}
          onChange={(e) => handleChange('location', e.target.value)}
          heading={headings.field3}
          inputPlaceholder={headings.field3}
        />
        <div className='generator-accordian-inputanddate-dateset'>
          <span>{headings.field4}</span>
          <div className='generator-accordian-inputanddate-dateset-datedash'>
            {/* <input
              type={"month"}
              dateFormat="MM/yyyy"
              value={education[accordianIndex]?.startDate}generator-accordian-inputanddate
              selected={startDate}
              placeholderText="mm/yyyy"
              onChange={(date) => handleChange("startDate", date.target.value)}
            /> */}

            <div style={{ width: '100%' }}>
              <DatePicker
                customInput={<CustomInput />}
                dateFormat='MM/yyyy'
                showMonthYearPicker
                value={education[accordianIndex]?.startDate}
                // selected={new Date(education[accordianIndex]?.startDate)}
                onChange={(date) => {
                  handleChange('startDate', moment(date).format('YYYY-MM'))
                }}
              ></DatePicker>
            </div>
            <h6>-</h6>

            {/* <input
              type={"month"}
              dateFormat="MM/yyyy"
              value={education[accordianIndex]?.endDate}
              selected={endDate}
              placeholderText="mm/yyyy"
              onChange={(date) => {
                let dateM = moment().format("YYYY-MM")
               let dateValue =  date.target.value == dateM ? "Present" : date.target.value
                console.log(dateValue)
                handleChange("endDate", date.target.value)}}
            /> */}

            <div style={{ width: '100%' }}>
              <DatePicker
                // selected={education[accordianIndex]?.toggle ?new Date() : new Date(education[accordianIndex]?.endDate)}
                customInput={<CustomInput />}
                minDate={education[accordianIndex]?.toggle ? new Date() : ''}
                maxDate={education[accordianIndex]?.toggle ? new Date() : ''}
                dateFormat='MM/yyyy'
                showMonthYearPicker
                value={
                  education[accordianIndex]?.toggle
                    ? 'dags dato'
                    : education[accordianIndex]?.endDate
                }
                onChange={(date) => {
                  if (education[accordianIndex]?.toggle) {
                    handleChange('endDate', moment().format('YYYY-MM'))
                  } else {
                    handleChange('endDate', moment(date).format('YYYY-MM'))
                  }
                }}
              >
                <div
                  style={{
                    padding: '5px',
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}
                >
                  <Switch
                    onChange={onToggleChange}
                    onColor='#EEB856'
                    checked={education[accordianIndex]?.toggle}
                    className='react-switch'
                  />

                  <span>Nåværende</span>
                </div>
              </DatePicker>
            </div>
          </div>
        </div>
      </div>

      <div className='generator-accordian-textareainput'>
        <span>{headings.field5}</span>
         <ReactQuill
        value={education[accordianIndex]?.additionalInformation}
        onChange={(content, delta, source, editor) => {
          handleChange("additionalInformation",editor.getHTML()); // update state variable with new content
            }}
/>
      </div>
    </div>
  )
}

export default GeneratorAccordian
