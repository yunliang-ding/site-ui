import React, { useState } from 'react'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| checked       | boolean   | 指定当前是否选中	           | 无       |
| disabled      | boolean   | 失效状态	          | 无       |
| onChange      | function(e) | 输入框内容变化时的回调    | 无      |
| style         | Object      | 样式                 | 无      |
 */
export default ({
  checked = false,
  disabled = false,
  onChange,
  style = {},
  children
}) => {
  const [_checked, setchecked] = useState(checked)
  let className = _checked ? 'sui-checkbox sui-checkbox-checked' : 'sui-checkbox'
  disabled  && (className += ' sui-checkbox-disabled')
  return <>
    <label className='sui-checkbox-wrapper'>
      <span className={className}>
        <input
          type='checkbox'
          readOnly={disabled}
          style={style}
          checked={_checked}
          className='sui-checkbox-input'
          onChange={
            (e) => {
              if(disabled){return}
              setchecked(e.target.checked)
              typeof onChange === 'function' && onChange(e)
            }
          } />
        <span className='sui-checkbox-inner'></span>
      </span>
      <span>
        {
          children
        }
      </span>
    </label>
  </>
}