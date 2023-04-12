import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import arrowdown from '../../assests/images/arrowdown.png'
import PrimaryInput, { HeadInput } from './primaryInput'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
  Education_DATA,
  Experiance_Data,
  getRefToggle,
  referenceData,
} from '../../Redux/reducers/CvGeneratorReducer'
import { editReference } from '../../Redux/actions/CvGeneratorAction'

const ReferenceGeneratorAccordian = ({
  open,
  setOpen,
  title,
  accordianIndex,
  headings,
}) => {
  const dispatch = useDispatch()
  let references = useSelector(referenceData)
  const toggleData = useSelector(getRefToggle)

  const handleChange = (field, value) => {
    let change = references.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        }
      }
      return item
    })
    dispatch(editReference(change))
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    const prefix = 'Telefon: '
    let emailValue

    if (value === '') {
      emailValue = null
    } else if (value.startsWith(prefix)) {
      emailValue = value
    } else {
      emailValue = prefix + value
    }

    handleChange('email', emailValue)
  }
  return (
    <div className='generator-accordian'>
      <div className='generator-accordian-heading'>
        <span>{headings?.heading}</span>
        <img
          src={arrowdown}
          alt='arrowdown'
          onClick={() =>
            handleChange(
              'enableAccordian',
              !references[accordianIndex].enableAccordian
            )
          }
        />
      </div>

      <div className='generator-accordian-textfields'>
        <HeadInput
          value={references[accordianIndex]?.name}
          onChange={(e) => handleChange('name', e.target.value)}
          heading={'Navn'}
          disabled={toggleData}
          inputPlaceholder={!toggleData ? 'navn' : null}
        />
        <HeadInput
          value={references[accordianIndex]?.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
          accordianIndex={accordianIndex}
          heading={'Selskap'}
          inputPlaceholder={!toggleData ? 'selskap' : null}
          disabled={toggleData}
        />
      </div>
      <div className='generator-accordian-inputanddate'>
        <HeadInput
          // value={`Telefon:${}`}
          value={references[accordianIndex]?.email}
          // value={basicInformation.firstName}
          onChange={handleInputChange}
          heading={'Telefonnummer'}
          inputPlaceholder={!toggleData ? '' : null}
          disabled={toggleData}
        />
      </div>
    </div>
  )
}
export default ReferenceGeneratorAccordian
