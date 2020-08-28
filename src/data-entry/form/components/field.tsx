import React from 'react'
const Field = ({
  rules,
  label,
  validateStatus,
  children
}: any) => {
  const className = ['sui-form-field']
  let message = false
  let required = false
  if(rules){
    let rule = rules.find(item => item.required)
    if(rule){
      required = rule.required
      message = rule.message
    }
  }
  if (required) {
    className.push('sui-form-field-required')
  }
  if(validateStatus === 'error'){
    className.push('sui-form-field-error')
  }
  return <span className={className.join(' ')}>
    {
      label && <span className='sui-form-field-label'>
        <span>{label}</span>
      </span>
    }
    <span className='sui-form-field-children'>
      {children}
      {
        validateStatus && message && <span className='sui-form-field-message'>{message}</span>
      }
    </span>
  </span>
}
Field.nickName = 'Field'
export default Field