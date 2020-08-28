import React from 'react'
import { Input } from '../../../index'
const Field = ({
  rules,
  label,
  validateStatus,
  children
}: any) => {
  const className = ['sui-form-field']
  if (rules && rules.some(item => item.required)) {
    className.push('sui-form-field-required')
  }
  return <span className={className.join(' ')}>
    {
      label && <span className='sui-form-field-label'>{label}</span>
    }
    <span className='sui-form-field-children'>{
      children.map(item => {
        return item.formType ? <Input {...item} key={item.key} /> : item
      })
    }</span>
  </span>
}
Field.nickName = 'Field'
export default Field