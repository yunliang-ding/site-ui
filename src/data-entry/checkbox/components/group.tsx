import React, { useState } from 'react'
import { Checkbox } from '../../../index'
/**
 * Checkbox.Group
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| checked       | boolean   | 指定当前是否选中	           | 无       |
| disabled      | boolean   | 失效状态	          | 无       |
| onChange      | function(value) | 输入框内容变化时的回调    | 无      |
| name         | Object      | 样式                 | 无      |
| style         | Object      | 样式                 | 无      |
 */
export default ({
  options = [],
  value = false,
  disabled = false,
  onChange,
  children,
  style = {}
}) => {
  const [_value, setvalue] = useState(value)
  const _options = options.map(option => {
    return {
      key: Math.random(),
      label: typeof option === 'string' ? option : option.label,
      value: typeof option === 'string' ? option : option.value
    }
  })
  return <div className='sui-checkbox-group' style={style}>
    {
      children ? children : _options.map(option => {
        return <Checkbox
          key={option.key}
          disabled={disabled}
          checked={option.value === _value}
          onChange={
            (e) => {
              setvalue(e.target.value)
              typeof onChange === 'function' && onChange(option.value)
            }
          }
        >{option.label}</Checkbox>
      })
    }
  </div>
}