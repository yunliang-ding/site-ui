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
  return <>
    <label class='sui-checkbox-wrapper'>
      <span class='sui-checkbox'>
        <input
          type='checkbox'
          readOnly={disabled}
          style={style}
          class='sui-checkbox-input'
          checked={_checked}
          onChange={
            (e) => {
              setchecked.bind(null, e.target.checked)
              typeof onChange === 'function' && onChange(e.target.checked)
            }
          } />
        <span class='sui-checkbox-inner'></span>
      </span>
      <span>
        {
          children
        }
      </span>
    </label>
  </>
}