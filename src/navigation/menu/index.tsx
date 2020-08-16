import React from 'react'
import { MenuVerical, MenuHorizontal } from './components'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| size         | number   | 字体大小       | 18       |
| color        | stirng   | 字体颜色       | 无       |
| style        | Object   | 样式          | 无       |
| type         | string    | icon        | 无       |
| onClick      | function(e) | 点击回调    | 无       |
 */
export default (props:any) => {
  return props.mode === 'horizontal' ? <MenuHorizontal {...props} /> : <MenuVerical {...props} />
}