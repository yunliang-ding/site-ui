import React from 'react'
import { Icon } from '../../index'
export default ({
  label
}) => {
  return <div className='sui-empty-wrapper'>
    <Icon type='iconempty'/>
    <span className='sui-empty-wrapper-label'>{label}</span>
  </div>
}