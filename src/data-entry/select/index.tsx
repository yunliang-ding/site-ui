/**
 * 
| **属性名**           | **类型**                                | **描述**                            | **默认** |
| -------------------- | --------------------------------------- | ----------------------------------- | -------- |
| value                | string/string[]                         | 指定当前选中的条目                  | 无       |
| options              | string[]                                | 下拉选项                           | 无       |
| placeholder          | string                                  | 提示文案                           | 无       |
| allowClear           | boolean                                 | 支持清除                            | false    |
| autoClearSearchValue | boolean                                 | 是否在选中项后清空搜索框            | true     |
| autoFocus            | boolean                                 | 默认获取焦点                        | false    |
| disabled             | boolean                                 | 是否禁用                             | false    |
| style                | object                                  | 输入框 style 属性                    | 无       |
| dropdownClassName    | object                                  | 下拉菜单的 style 属性               | 无       |
| dropdownStyle        | object                                  | 下拉菜单的 style 属性               | 无       |
| filterOption         | boolean or function(inputValue, option) | 过滤                                | true     |
| getPopupContainer    | Function(dom) () => document.body       | 菜单渲染父节点                      | 无       |
| multiple             | boolean                                 | 是否支持多选                        | true     |
| showArrow            | boolean                                 | 是否显示下拉小箭头                  | true     |
| showSearch           | boolean                                 | 使单选模式可搜索                    | false    |
| open                 | boolean                                 | 是否展开下拉菜单                    | false    |
| onChange             | function(value, option)                 | 选中 option，或 input 的 value 变化 | 无       |
| onSearch             | function(value:string)                  | 文本框值变化时回调                  | 无       |
 */
import React from 'react'
import { Select, SelectMultiple } from './components'
export default (props:any) => {
  return props.multiple ? <SelectMultiple {...props} /> : <Select {...props} /> 
}