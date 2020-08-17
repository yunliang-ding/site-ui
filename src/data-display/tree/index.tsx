import React from 'react'
import { Tree } from './components'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ---------- | ---------------------------- | ------------ | -------- |
| menus      | array                        | 菜单数据     | []       |
| menuClick  | function(openKey, selectKey) | 菜单点击事件 | 无       |
| openKey    | string[]                     | 样式         | 无       |
| selectKey  | string[]                     | icon         | 无       |
| style      | object                       | 点击回调     | 无       |
| collapsed  | boolean                      | 是否收起     | false    |
| theme      | string                       | light/dark   | light    |
 */
export default (props: any) => {
  return <Tree {...props} />
}