import React, { useState, useEffect } from 'react'
import { Icon } from '../../index'
export default ({
  value = '',
  disabled,
  style = {},
  placeholder,
  maxLength,
  onChange,
  onBlur,
  onFocus,
  onPressEnter
}) => {
  const [_value, setvalue] = useState(value)
  useEffect(() => {
    setvalue(value)
  }, [value])
  return <div className='sui-input-number-wrapper' style={style}>
    <input
      type='text'
      className={disabled ? 'sui-input-number-disabled' : 'sui-input-number'}
      placeholder={placeholder}
      value={_value}
      maxLength={maxLength}
      readOnly={disabled}
      onChange={
        (e) => {
          setvalue(e.target.value)
          typeof onChange === 'function' && onChange(e)
        }
      }
      onBlur={
        (e) => {
          typeof onBlur === 'function' && onBlur(e)
        }
      }
      onFocus={
        (e) => {
          typeof onFocus === 'function' && onFocus(e)
        }
      }
      onKeyDown={
        (e) => {
          if (e.keyCode === 13) {
            typeof onPressEnter === 'function' && onPressEnter(e)
          }
        }
      }
    />
    {
      !disabled && <div className='sui-input-number-suffix'>
        <div className='suffix-top'><Icon type='iconxiala1' size={12} /></div>
        <div className='suffix-bottom'><Icon type='iconxialadown' size={12} /></div>
      </div>
    }
  </div>
}