import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '../../../index'
export default ({
  options,
  value = undefined,
  allowClear = false,
  placeholder,
  disabled = false,
  style = {},
  dropdownClassName,
  dropdownStyle = {},
  onChange,
  open = false
}) => {
  const [_open, setopen] = useState(open)
  let className = _open ? 'sui-select sui-select-open' : 'sui-select'
  disabled && (className += ' sui-select-disabled')
  const dropDownClassName = dropdownClassName ? dropdownClassName + ' sui-select-dropdown' : 'sui-select-dropdown'
  const [_value, setvalue] = useState(Array.isArray(value) ? value : []) // 格式处理
  const selected: any = options.filter(item => _value.indexOf(item.value) > -1) || [] // 选中项
  // option click
  const optionClick = (option: any) => {
    let index = selected.findIndex(item => item.value === option.value)
    if (index === -1) {
      selected.push(option)
    } else {
      selected.splice(index, 1)
    }
  }
  /**
   * 计算dom高度
   */
  const selectWapper = useRef()
  const selectSelectionWapper = useRef()
  const selectValueWapper = useRef()
  const dropDownWapper = useRef()
  useEffect(()=>{
    selectSelectionWapper.current.style.height = getComputedStyle(selectValueWapper.current).height
    dropDownWapper.current && (dropDownWapper.current.style.top = parseInt(getComputedStyle(selectWapper.current).height) + 4 + 'px')
  })
  useEffect(()=>{
    setvalue(Array.isArray(value) ? value : [])
  }, [value])
  /**
   * Virtual-Dom
   */
  return <div className={className} style={style} ref={selectWapper}>
    <div ref={selectSelectionWapper} className='sui-select-selection sui-select-selection-multiple' onClick={
      () => {
        if (disabled) return
        setopen(!_open)
      }
    }>
      <div ref={selectValueWapper} className='sui-select-selection-selected-value'>
        {
          selected.length === 0 ? <span style={{ color: '#aaa' }}>{placeholder}</span> : <div className='sui-select-selection-choice-warpper'>
            {
              selected.map(item => {
                return <span className='sui-select-selection-choice' key={item.key}>
                  {item.label}
                  <Icon size={14} type='iconguanbi' onClick={
                    (e) => {
                      e.stopPropagation() // 阻止冒泡
                      optionClick(item) // 删除
                      typeof onChange === 'function' && onChange(selected.map(e => e.value), null)
                    }
                  } />
                </span>
              })
            }
          </div>
        }
      </div>
      <Icon type='iconxialadown' />
      {
        !disabled && allowClear && selected.length > 0 && <Icon size={14} type='iconcuo' onClick={
          (e) => {
            e.stopPropagation() // 阻止冒泡
            typeof onChange === 'function' && onChange([], null)
          }
        } />
      }
    </div>
    {
      _open && <>
        <div className='sui-select-mask' onClick={setopen.bind(null, false)} />
        <div ref={dropDownWapper} style={dropdownStyle} className={dropDownClassName}>
          {
            options.map(option => {
              let className = _value.indexOf(option.value) > -1 ? 'sui-select-dropdown-menu sui-select-dropdown-menu-selected' : 'sui-select-dropdown-menu'
              option.disabled && (className += ' sui-select-dropdown-menu-disabled')
              return <div
                key={option.key}
                className={className}
                onClick={
                  () => {
                    if (option.disabled) return
                    // 没有添加，有删除
                    optionClick(option)
                    typeof onChange === 'function' && onChange(selected.map(e => e.value), option)
                  }
                }
              >
                {option.label}
                <Icon size={14} type='iconduihao' />
              </div>
            })
          }
        </div>
      </>
    }
  </div>
}