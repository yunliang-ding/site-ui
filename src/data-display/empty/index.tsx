import React from 'react'
import { Icon } from '../../index'
export default ({
  label = 'No Data',
  icon = 'iconempty'
}) => {
  return <div className='sui-empty-wrapper'>
    <Icon type={icon} />
    <span className='sui-empty-wrapper-label'>{label}</span>
  </div>
}