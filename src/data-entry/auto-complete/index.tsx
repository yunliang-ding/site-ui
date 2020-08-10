/**
 * 
| **属性名**           | **类型**                          | **描述**                            | **默认** |
| -------------------- | --------------------------------- | ----------------------------------- | -------- |
| value                | string/string[]                   | 指定当前选中的条目                  | 无       |
| dataSource           | string[]                          | 下拉选项                            | 无       |
| placeholder          | string                            | 提示文案                            | 无       |
| allowClear           | boolean                           | 支持清除                            | false    |
| autoFocus            | boolean                           | 默认获取焦点                        | false    |
| disabled             | boolean                           | 是否禁用                            | false    |
| style                | object                            | 输入框 style 属性                   | 无       |
| dropdownClassName    | object                            | 下拉菜单的 style 属性               | 无       |
| dropdownStyle        | object                            | 下拉菜单的 style 属性               | 无       |
| filter               | boolean/function(option,value)    | 是否支持过滤/自定义过滤             | false    |
| onChange             | function(value, option)           | 选中 option                      | 无       |
| onSearch             | function(value:string)            | 文本框值变化时回调                  | 无       |
 */
import React, { useState, useEffect } from 'react'
import { Icon, Empty } from '../../index'
export default ({
  dataSource,
  value,
  allowClear = false,
  placeholder,
  disabled = false,
  style = {},
  dropdownClassName,
  dropdownStyle = {},
  onChange,
  onSearch,
  open = false
}: any) => {
  useEffect(() => {
    setvalue(value)
  }, [value])
  const [_open, setopen] = useState(open)
  const [_value, setvalue] = useState(value)
  let className = _open ? 'sui-auto sui-auto-open' : 'sui-auto'
  disabled && (className += ' sui-auto-disabled')
  const dropDownClassName = dropdownClassName ? dropdownClassName + ' sui-auto-dropdown' : 'sui-auto-dropdown'
  return <div className={className} style={style}>
    <div className='sui-auto-selection' onClick={
      () => {
        if (disabled) return
        setopen(!_open)
      }
    }>
      <div className='sui-auto-selection-selected-value'>
        {
          <input
            value={_value}
            className='sui-auto-selection-selected-input'
            placeholder={placeholder}
            onChange={
              (e) => {
                setvalue(e.target.value)
                typeof onSearch === 'function' && onSearch(e.target.value)
              }
            }
          />
        }
      </div>
      {
        allowClear && _value !== '' && <Icon type='iconcuo' onClick={
          (e) => {
            e.stopPropagation() // 组织冒泡
            typeof onChange === 'function' && onChange('')
          }
        } />
      }
    </div>
    {
      _open && <>
        <div className='sui-auto-mask' onClick={setopen.bind(null, false)} />
        <div style={dropdownStyle} className={dropDownClassName}>
          {
            dataSource.length > 0 ? dataSource.map(option => {
              return <div
                key={option}
                className='sui-auto-dropdown-menu'
                onClick={
                  () => {
                    setopen(false)
                    setvalue(_value + option)
                    typeof onChange === 'function' && onChange(_value + option)
                  }
                }
              >
                {
                  _value + option
                }
              </div>
            }) : <Empty label='暂无数据' />
          }
        </div>
      </>
    }
  </div>
}