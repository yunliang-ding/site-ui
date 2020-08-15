import React from 'react'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| size         | number   | 字体大小       | 18       |
| color        | stirng   | 字体颜色       | 无       |
| style        | Object   | 样式          | 无       |
| type         | string    | icon        | 无       |
| onClick      | function(e) | 点击回调    | 无       |
 */
export default ({ type, size=18, style, onClick, color }:any) => {
  let _style = style || {}
  _style.fontSize = size
  _style.color = color
  return <>
    <i className={'sui-icon ' + type} style={_style} onClick={
      (e:any) => {
        typeof onClick === 'function' && onClick(e)
      }
    } />
  </>
}