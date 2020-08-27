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
| filter               | boolean/function(option,value)          | 是否支持过滤/自定义过滤               | false     |
| getPopupContainer    | Function(dom) () => document.body       | 菜单渲染父节点                      | 无       |
| multiple             | boolean                                 | 是否支持多选                        | true     |
| showArrow            | boolean                                 | 是否显示下拉小箭头                  | true     |
| showSearch           | boolean                                 | 使单选模式可搜索                    | false    |
| open                 | boolean                                 | 是否展开下拉菜单                    | false    |
| onChange             | function(value, option)                 | 选中 option                       | 无       |
| onSearch             | function(value:string)                  | 文本框值变化时回调                  | 无       |
 */
import React from 'react'
import { Select, SelectMultiple, Option } from './components'
const SelectWrapper = (props: any) => {
  /**
   * 
   * @param item 解析Option
   */
  const getOptions = (item) => {
    let options = []
    if (Object.prototype.toString.call(item) === '[object Array]') {
      options = item
    } else if (Object.prototype.toString.call(item) === '[object Object]') {
      options.push(item)
    }
    /**
     * filter 匹配类型
     */
    return options.filter(option => option.type.nickName === 'Option').map(option => {
      return {
        key: option.key || Math.random(),
        label: option.props.children,
        value: option.props.value,
        disabled: option.props.disabled
      }
    })
  }
  let _options = []  // 定义options
  if (props.children && props.options === undefined) {
    _options = getOptions(props.children) // 递归转换
  }
  if(props.options){
    _options = props.options
  }
  // 组装options
  const transfrom = (options) => {
    return Array.isArray(options) ? options.map(option => {
      return {
        key: Math.random(),
        label: typeof option === 'string' ? option : option.label,
        value: typeof option === 'string' ? option : option.value,
        disabled: typeof option === 'string' ? false : option.disabled
      }
    }) : []
  }
  return props.multiple
    ? <SelectMultiple {...props} options={transfrom(_options)} />
    : <Select {...props} options={transfrom(_options)} />
}
SelectWrapper.Option = Option
export default SelectWrapper