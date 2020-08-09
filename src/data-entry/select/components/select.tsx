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
import React, { useState } from 'react'
import { Icon } from '../../../index'
export default ({
  options = [],
  value,
  allowClear = false,
  placeholder,
  disabled = false,
  dropdownClassName,
  dropdownStyle = {},
  onChange,
  open = false
}) => {
  const [_open, setopen] = useState(open)
  let className = _open ? 'sui-select sui-select-open' : 'sui-select'
  disabled && (className += ' sui-select-disabled')
  const dropDownClassName = dropdownClassName ? dropdownClassName + ' sui-select-dropdown' : 'sui-select-dropdown'
  const _options = Array.isArray(options) ? options.map(option => {
    return {
      key: Math.random(),
      label: typeof option === 'string' ? option : option.label,
      value: typeof option === 'string' ? option : option.value,
      disabled: typeof option === 'string' ? false : option.disabled
    }
  }) : []
  const selected: any = _options.find(item => item.value === value) || {}
  return <div className={className}>
    <div className='sui-select-selection' onClick={
      () => {
        if (disabled) return
        setopen(!_open)
      }
    }>
      <div className='sui-select-selection-selected'>
        {selected.value === undefined ? <span style={{ color: '#aaa' }}>{placeholder}</span> : selected.label}
      </div>
      <Icon type='iconxialadown' />
      {
        allowClear && selected.value !== undefined && <Icon type='iconcuo' onClick={
          (e) => {
            e.stopPropagation()
            typeof onChange === 'function' && onChange(null, null)
          }
        } />
      }
    </div>
    {
      _open && <>
        <div className='sui-select-mask' onClick={setopen.bind(null, false)} />
        <div style={dropdownStyle} className={dropDownClassName}>
          {
            _options.map(option => {
              let className = option.value === value ? 'sui-select-dropdown-menu sui-select-dropdown-menu-selected' : 'sui-select-dropdown-menu'
              option.disabled && (className += ' sui-select-dropdown-menu-disabled')
              return <div
                key={option.key}
                className={className}
                onClick={
                  () => {
                    if (option.disabled) return
                    setopen(false)
                    typeof onChange === 'function' && onChange(option.value, option)
                  }
                }
              >
                {option.label}
              </div>
            })
          }
        </div>
      </>
    }
  </div>
}