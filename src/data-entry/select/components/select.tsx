import React, { useState, useEffect } from 'react'
import { Icon, Empty } from '../../../index'
export default ({
  options,
  value,
  allowClear = false,
  placeholder,
  disabled = false,
  style = {},
  dropdownClassName,
  dropdownStyle = {},
  onChange,
  onSearch,
  filter = false,
  open = false
}: any) => {
  useEffect(() => {
    setoptions(options) // update
  }, [options])
  const [_open, setopen] = useState(open)
  const [_options, setoptions] = useState(options)
  const selected: any = _options.find(item => item.value === value) || {} // 选中项
  const [keyword, setkeyword] = useState()
  const [_placeholder, setplaceholder] = useState(selected.label || placeholder)
  let className = _open ? 'sui-select sui-select-open' : 'sui-select'
  disabled && (className += ' sui-select-disabled')
  const dropDownClassName = dropdownClassName ? dropdownClassName + ' sui-select-dropdown' : 'sui-select-dropdown'
  return <div className={className} style={style}>
    <div className='sui-select-selection' onClick={
      () => {
        if (disabled) return
        setopen(!_open)
      }
    }>
      <div className='sui-select-selection-selected-value'>
        {
          filter ?
            <input
              value={keyword}
              className='sui-select-selection-selected-input'
              placeholder={_placeholder}
              onBlur={setkeyword.bind(null, '')}
              onChange={
                (e) => {
                  setkeyword(e.target.value)
                  e.target.value.trim() !== '' ? setoptions(
                    options.filter(option => {
                      return typeof filter === 'function'
                        ? filter(option, e.target.value)
                        : option.label.toLowerCase().includes(e.target.value.trim().toLowerCase())
                    })
                  ) : setoptions(options)
                  typeof onSearch === 'function' && onSearch(e.target.value)
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
                    setplaceholder(option.value) // 设置 placeholder
                    setkeyword('') // 清空 keyword
                    setoptions(options) // 重制 options
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