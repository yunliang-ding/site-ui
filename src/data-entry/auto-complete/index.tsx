/**
 * 
| **属性名**           | **类型**                          | **描述**                            | **默认** |
| -------------------- | --------------------------------- | ----------------------------------- | -------- |
| value                | string/string[]                   | 指定当前选中的条目                  | 无       |
| dataSource           | string[]                          | 下拉选项                            | 无       |
| placeholder          | string                            | 提示文案                            | 无       |
| allowClear           | boolean                           | 支持清除                            | false    |
| style                | object                            | 输入框 style 属性                   | 无       |
| dropdownClassName    | object                            | 下拉菜单的 style 属性               | 无       |
| dropdownStyle        | object                            | 下拉菜单的 style 属性               | 无       |
| onSelect             | function(value, option)           | 选中 option                      | 无       |
| disabled             | boolean     | 是否禁用状态           | false    |
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
  onSelect,
  open = false
}: any) => {
  const [_value, setvalue] = useState(value)
  useEffect(() => {
    let suffix = dataSource.find(item => _value.endsWith(item)) // 拆分 value / suffix
    if(suffix){
      setvalue(_value.substr(0, _value.lastIndexOf(suffix)))
      setsuffix(suffix)
    } else {
      setvalue(_value)
    }
  }, [_value])
  const [_open, setopen] = useState(open)
  const [suffix, setsuffix] = useState('')
  let className = _open ? 'sui-auto sui-auto-open' : 'sui-auto'
  disabled && (className += ' sui-auto-disabled')
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
            value={_value + suffix}
            className='sui-auto-selection-selected-input'
            placeholder={placeholder}
            onChange={
              (e) => {
                setvalue(e.target.value)
                setsuffix('')
              }
            }
          />
        }
      </div>
      {
        allowClear && _value !== '' && <Icon type='suiconcuo' onClick={
          (e) => {
            e.stopPropagation() // 阻止冒泡
            setvalue('')
            setsuffix('')
            typeof onSelect === 'function' && onSelect('')
          }
        } />
      }
    </div>
    {
      _open && _value !== '' && <>
        <div className='sui-auto-mask' onClick={setopen.bind(null, false)} />
        <div className='sui-auto-dropdown'>
          {
            dataSource.length > 0 ? dataSource.map(option => {
              let className = option === _value ? 'sui-auto-dropdown-menu sui-auto-dropdown-menu-selected' : 'sui-auto-dropdown-menu'
              return <div
                key={option}
                className={className}
                onClick={
                  () => {
                    setopen(false)
                    setsuffix(option)
                    typeof onSelect === 'function' && onSelect(_value + option)
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