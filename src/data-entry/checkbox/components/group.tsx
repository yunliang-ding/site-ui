import React, {useState, useEffect} from 'react'
import { Checkbox } from '../../../index'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| checked       | boolean   | 指定当前是否选中	           | 无       |
| disabled      | boolean   | 失效状态	          | 无       |
| onChange      | function(value) | 输入框内容变化时的回调    | 无      |
| name         | string      | 样式                 | 无      |
| style         | Object      | 样式                 | 无      |
| value         | string[]      | 指定选中的选项	   | 无      |
 */
export default ({
  options = [],
  value = [],
  disabled = false,
  onChange,
  style = {},
  name = ''
}) => {
  const [_value, setvalue] = useState(Array.isArray(value) ? value : [])
  const _options = options.map(option => {
    return {
      key: Math.random(),
      label: typeof option === 'string' ? option : option.label,
      value: typeof option === 'string' ? option : option.value,
      disabled: typeof option === 'string' ? false : option.disabled
    }
  })
  // useEffect(() => {
  //   setvalue(Array.isArray(value) ? value : [])
  // }, [value])
  return <div className='sui-checkbox-group' style={style}>
    {
      _options.map((option:any) => {
        return <Checkbox
          key={option.key}
          disabled={disabled || option.disabled}
          name={name}
          checked={
            Array.isArray(_value) ? _value.indexOf(option.value) > -1 : false
          }
          onChange={
            (e) => {
              let __value = [..._value]
              if (e.target.checked) {
                __value.push(option.value)
              } else {
                __value = _value.filter(value => value !== option.value)
              }
              setvalue(__value)
              typeof onChange === 'function' && onChange(__value)
            }
          }
        >{option.label}</Checkbox>
      })
    }
  </div>
}