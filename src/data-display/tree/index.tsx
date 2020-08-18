import React from 'react'
import { Tree } from './components'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ---------- | ---------------------------- | ------------ | -------- |
| treeData      | array                        | 菜单数据     | []       |
| expandedKeys    |     string[]                  | 展开节点         | 无       |
| checkedKeys      | string[]                         | 点击回调     | 无       |
| disabled    | boolean                      | 是否禁用     | false    |
| onSelected  | function(key) | 点击事件 | 无       |
| onCheck    | function(checkedKeys)  |  选中事件 | 无       |
| onExpand   | function(expandedKeys)  | 展开事件 | 无       |
| style      | object                        | 样式   | 无    |
 */
export default (props: any) => {
  return <Tree {...props} />
}