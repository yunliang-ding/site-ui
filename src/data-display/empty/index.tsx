/**
 * 
| **属性名** | **类型**  | **描述**   | **默认**  |
| ---------- | --------- | ---------- | --------- |
| label      | ReactNode | 展示的内容 | No Data   |
| icon       | string    | icon       | iconempty |
 */
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