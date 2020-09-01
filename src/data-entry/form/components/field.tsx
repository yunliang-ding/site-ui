import React from 'react'
import { Icon, Tooltip } from '../../../index'
const Field = ({
  rules,
  label,
  tooltips,
  tooltipsText,
  message,
  validateStatus,
  children,
  style = {},
  columns
}: any) => {
  const className = ['sui-form-field']
  let required = false
  if (rules) {
    let rule = rules.find(item => item.required)
    if (rule) {
      required = rule.required
    }
  }
  if (required) {
    className.push('sui-form-field-required')
  }
  if (validateStatus === 'error') {
    className.push('sui-form-field-error')
  }
  if (style.width === undefined && columns !== undefined) {
    style.width = `${100 / columns}%`
  }
  return <span className={className.join(' ')} style={style}>
    {
      label && <span className='sui-form-field-label'>
        <span>{label}</span>
        {
          tooltips && <Tooltip title={tooltipsText}>
            <Icon type='suicon19ad-icon-tooltip' style={{ margin: '0 4px' }} />
          </Tooltip>
        }
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