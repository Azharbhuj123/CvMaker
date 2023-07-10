import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import arrowdown from '../../assests/images/arrowdown.png'
import PrimaryInput, { HeadInput } from './primaryInput'
import { useDispatch, useSelector } from 'react-redux'
import { BiCalendarAlt } from 'react-icons/bi'
import { forwardRef } from 'react'
import Switch from 'react-switch'
import moment from 'moment'
import {
  Experiance_Data,
  getInternships,
} from '../../Redux/reducers/CvGeneratorReducer'
import {
  addexperianceData,
  editexperiance,
  editInternship,
  editWorkExperiance,
  removeWorkExperiance,
  updateInternshipToggle,
} from '../../Redux/actions/CvGeneratorAction'
import QuillTextEditor4 from '../QuillTextEditor/QuilTextEditor4'
import ReactQuill from 'react-quill'

const InternshipGeneratorAccordian = ({
  open,
  setOpen,
  title,
  accordianIndex,
  headings,
}) => {
  const dispatch = useDispatch()
  const experiance = useSelector(getInternships)

  const handleChange = (field, value) => {
    console.log(field, '<==== field')
    console.log(value, '<==== value')
    console.log(accordianIndex, '<=== index')
    let change = experiance.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        }
      }
      return item
    })
    console.log(change)
    console.log(editInternship(change))
    dispatch(editInternship(change))
  }

  const onToggleChange = (nextChecked) => {
    dispatch(updateInternshipToggle({ accordianIndex, nextChecked }))
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
              !experiance[accordianIndex].enableAccordian
            )
          }
        />
      </div>

      <div className='generator-accordian-textfields'>
        <HeadInput
          value={experiance[accordianIndex]?.jobTitle}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
          heading={headings.field1}
          inputPlaceholder={headings.field1}
        />
        <HeadInput
          value={experiance[accordianIndex]?.employer}
          onChange={(e) => handleChange('employer', e.target.value)}
          accordianIndex={accordianIndex}
          heading={headings.field2}
          inputPlaceholder={headings.field2}
        />
      </div>
      <div className='generator-accordian-inputanddate'>
        <HeadInput
          value={experiance[accordianIndex]?.location}
          onChange={(e) => handleChange('location', e.target.value)}
          heading={headings.field3}
          inputPlaceholder={headings.field3}
        />
        <div className='generator-accordian-inputanddate-dateset'>
          <span>{headings.field4}</span>
          <div className='generator-accordian-inputanddate-dateset-datedash'>
            {/* <input
              type={"date"}
              dateFormat="MM/yyyy"
              value={experiance[accordianIndex]?.startDate}
              placeholderText="mm/yyyy"
              onChange={(date) => {
                console.log(
                  moment(date.target.value).format("MM/YYYY"),
                  "<=========================wowowwowoow"
                );
                handleChange("startDate", date.target.value);
              }}
            /> */}

            <div style={{ width: '100%' }}>
              <DatePicker
                customInput={<CustomInput />}
                dateFormat='MM/yyyy'
                showMonthYearPicker
                value={experiance[accordianIndex]?.startDate}
                // selected={ new Date(experiance[accordianIndex]?.startDate)}
                onChange={(date) => {
                  handleChange('startDate', moment(date).format('YYYY-MM'))
                }}
              ></DatePicker>
            </div>
            <h6>-</h6>
            {/* <input
              type={"date"}
              dateFormat="MM/yyyy"
              value={experiance[accordianIndex]?.endDate}
              placeholderText="mm/yyyy"
              onChange={(date) => handleChange("endDate", date.target.value)}
            /> */}

            <div style={{ width: '100%' }}>
              <DatePicker
                //  selected={experiance[accordianIndex]?.toggle ?new Date() : new Date(experiance[accordianIndex]?.endDate)}
                customInput={<CustomInput />}
                minDate={experiance[accordianIndex]?.toggle ? new Date() : ''}
                maxDate={experiance[accordianIndex]?.toggle ? new Date() : ''}
                dateFormat='MM/yyyy'
                showMonthYearPicker
                value={
                  experiance[accordianIndex]?.toggle
                    ? 'dags dato'
                    : experiance[accordianIndex]?.endDate
                }
                onChange={(date) => {
                  if (experiance[accordianIndex]?.toggle) {
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
                    checked={experiance[accordianIndex]?.toggle}
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
        <textarea
          value={experiance[accordianIndex]?.additionalInformation}
          onChange={(e) =>
            handleChange("additionalInformation", e.target.value)
          }
        />
        {/* <ReactQuill
          value={experiance[accordianIndex]?.additionalInformation}
          onChange={(content, delta, source, editor) => {
            handleChange('additionalInformation', editor.getHTML()) // update state variable with new content
          }}
        /> */}
        {/* <QuillTextEditor4/> */}
      </div>
    </div>
  )
}

export default InternshipGeneratorAccordian
