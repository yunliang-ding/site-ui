import React, { useState } from 'react'
import { Icon, Empty } from '../../../index'
export default ({
  options = [],
  value,
  allowClear = false,
  placeholder,
  disabled = false,
  style = {},
  dropdownClassName,
  dropdownStyle = {},
  onChange,
  filterOption = false,
  open = false
}) => {
  const [_open, setopen] = useState(open)
  let className = _open ? 'sui-select sui-select-open' : 'sui-select'
  disabled && (className += ' sui-select-disabled')
  const dropDownClassName = dropdownClassName ? dropdownClassName + ' sui-select-dropdown' : 'sui-select-dropdown'
  const _options = Array.isArray(options) ? options.map(option => { // 组装options
    return {
      key: Math.random(),
      label: typeof option === 'string' ? option : option.label,
      value: typeof option === 'string' ? option : option.value,
      disabled: typeof option === 'string' ? false : option.disabled
    }
  }) : []
  const selected: any = _options.find(item => item.value === value) || {} // 选中项
  const [keyword, setkeyword] = useState(selected.label)
  return <div className={className} style={style}>
    <div className='sui-select-selection' onClick={
      () => {
        if (disabled) return
        setopen(!_open)
      }
    }>
      <div className='sui-select-selection-selected-value'>
        {
          filterOption ?
            <input
              value={keyword}
              className='sui-select-selection-selected-input'
              placeholder={placeholder}
              onChange={
                (e) => {
                  setkeyword(e.target.value)
                }
              }
            /> :
            selected.value === undefined ? <span style={{ color: '#aaa' }}>{placeholder}</span> : selected.label
        }
      </div>
      <Icon type='iconxialadown' />
      {
        allowClear && selected.value !== undefined && <Icon type='iconcuo' onClick={
          (e) => {
            e.stopPropagation() // 组织冒泡
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
            _options.length > 0 ? _options.map(option => {
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
            }) : <Empty label='暂无数据' />
          }
        </div>
      </>
    }
  </div>
}