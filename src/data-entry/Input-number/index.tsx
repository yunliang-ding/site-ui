/**
 * 
| **属性名**   | **类型**    | **描述**               | **默认** |
| ------------ | ----------- | ---------------------- | -------- |
| value        | string      | 输入框默认内容         | 无       |
| placeholder  | string      | 提示语                | 无       |
| step         | number      | 步长                 | 1    |
| disabled     | boolean     | 是否禁用状态           | false    |
| onChange     | function(value) | 输入框内容变化时的回调 | 无       |
| onPressEnter | function(e) | 按下回车的回调         | 无       |
| onBlur       | function(e) | 输入框得到焦点         | 无       |
| onFocus      | function(e) | 输入框失去焦点         | 无       |
| style        | Object      | 样式                   | 无       |
 */
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
  onPressEnter,
  step = 1,
  min,
  max
}:any) => {
  const [_value, setvalue] = useState(value)
  useEffect(() => {
    setvalue(value)
  }, [value])
  const add = () => {
    let value = Number(_value) + Number(step)
    if(max !== undefined){
      value <= max && updateValue(value)
    } else {
      updateValue(value)
    }
  }
  const minus = () => {
    let value = Number(_value) - Number(step)
    if(min !== undefined){
      value >= min && updateValue(value)
    } else {
      updateValue(value)
    }
  }
  const updateValue = (value) => {
    setvalue(step < 1 ? Number(value).toFixed(1) : Number(value))
    typeof onChange === 'function' && onChange(step < 1 ? Number(value).toFixed(1) : Number(value))
  }
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
        }
      }
      onBlur={
        () => {
          let value:any = Number(_value)
          if(isNaN(value)){
            value = ''
          }
          updateValue(value)
          typeof onBlur === 'function' && onBlur(value)
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
        <div className='suffix-top' onClick={add}><Icon type='iconxiala1' size={12} /></div>
        <div className='suffix-bottom' onClick={minus}><Icon type='iconxialadown' size={12} /></div>
      </div>
    }
  </div>
}