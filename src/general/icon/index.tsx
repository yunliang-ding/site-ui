import React from 'react'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| size         | number   | 字体大小       | 20       |
| style        | Object   | 样式          | 无       |
| type         | string    | icon        | 无       |
| onClick      | function(e) | 点击回调    | 无       |
 */
export default ({ type, size, style, onClick }:any) => {
  let _style = style || {}
  _style.size = size
  return <>
    <i className={'sui-icon ' + type} style={_style} onClick={
      (e:any) => {
        typeof onClick === 'function' && onClick(e)
      }
    } />
  </>
}