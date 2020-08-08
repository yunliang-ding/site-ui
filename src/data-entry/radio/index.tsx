import React, { useState } from 'react'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| checked       | boolean   | 指定当前是否选中	           | 无       |
| disabled      | boolean   | 失效状态	          | 无       |
| onChange      | function(e) | 输入框内容变化时的回调    | 无      |
| style         | Object      | 样式                 | 无      |
| name         | string      | 样式                 | 无      |
 */
export default ({
  checked = false,
  disabled = false,
  onChange,
  style = {},
  children,
  name = ''
}: any) => {
  const [_checked, setchecked] = useState(checked)
  let className = _checked ? 'sui-radio sui-radio-checked' : 'sui-radio'
  disabled && (className += ' sui-radio-disabled')
  return <>
    <label className='sui-radio-wrapper'>
      <span className={className}>
        <input
          type='radio'
          readOnly={disabled}
          style={style}
          name={name}
          checked={_checked}
          className='sui-radio-input'
          onChange={
            (e) => {
              if (disabled) { return }
              setchecked(e.target.checked)
              typeof onChange === 'function' && onChange(e)
            }
          } />
        <span className='sui-radio-inner'></span>
      </span>
      <span>
        {
          children
        }
      </span>
    </label>
  </>
}