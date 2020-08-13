/**
 * 
| **属性名**           | **类型**                                | **描述**                            | **默认** |
| -------------------- | --------------------------------------- | ----------------------------------- | -------- |
| value                | string[]                                | 指定当前选中的条目                  | 无       |
| options              | string[]                                | 下拉选项                           | 无       |
| placeholder          | string                                  | 提示文案                           | 无       |
| allowClear           | boolean                                 | 支持清除                            | false    |
| disabled             | boolean                                 | 是否禁用                             | false    |
| style                | object                                  | 输入框 style 属性                    | 无       |
| dropdownClassName    | object                                  | 下拉菜单的 style 属性               | 无       |
| dropdownStyle        | object                                  | 下拉菜单的 style 属性               | 无       |
| open                 | boolean                                 | 是否展开下拉菜单                    | false    |
| onChange             | function(value, option)                 | 选中 option                       | 无       |
| fieldNames           | object                                  | 自定义 options 中 label name children | 无   
 */
import React, { useState, useEffect } from 'react'
import { Icon, Input } from '../../index'
export default ({
  value,
  allowClear = true,
  placeholder,
  disabled = false,
  style = {},
  dropdownClassName,
  dropdownStyle = {},
  onChange,
  open = false,
  addonBefore,
  addonAfter
}: any) => {
  const timeList: any = [
    Object.keys(new Array(24).fill('')).map((item: any) => {
      return {
        key: Math.random(),
        label: item.padStart(2, 0),
        value: item.padStart(2, 0)
      }
    }),
    Object.keys(new Array(60).fill('')).map((item: any) => {
      return {
        key: Math.random(),
        label: item.padStart(2, 0),
        value: item.padStart(2, 0)
      }
    }),
    Object.keys(new Array(60).fill('')).map((item: any) => {
      return {
        key: Math.random(),
        label: item.padStart(2, 0),
        value: item.padStart(2, 0)
      }
    })
  ] // 日期选择
  /**
   * value Change
   */
  useEffect(() => {
    settimes(value ? value.split(':') : [])
    setvalue(value ? value.split(':') : [])
  }, [value])
  /**
   * 数据转化 转为2维数组渲染
   */
  const [times, settimes] = useState([]) // 最终选中的指
  const [_value, setvalue] = useState([]) // 内部存选中值容器
  const [_open, setopen] = useState(open)
  /**
   * 内部状态
   */
  let className = _open ? 'sui-time-picker sui-time-picker-open' : 'sui-time-picker'
  disabled && (className += ' sui-time-picker-disabled')
  const dropDownClassName = dropdownClassName ? dropdownClassName + ' sui-time-picker-dropdown' : 'sui-time-picker-dropdown'
  /**
   * JSX
   */
  return <div className={className} style={style}>
    <Input
      suffix={<Icon type='icontime' />}
      addonBefore={addonBefore}
      disabled={disabled}
      addonAfter={addonAfter}
      placeholder={placeholder}
      value={times.join(':')}
      readOnly
      allowClear={allowClear && times.length > 0}
      onAllowClear={
        () => {
          setvalue([])
          typeof onChange === 'function' && onChange('')
        }
      }
      onFocus={setopen.bind(null, true)}
    />
    {
      _open && <>
        <div className='sui-time-picker-mask' onClick={
          () => {
            setopen(false)
            if (_value.length === timeList.length) { // 选择完毕
              settimes(_value)
              typeof onChange === 'function' && onChange(_value.join(':'))
            }
          }
        } />
        <div style={dropdownStyle} className={dropDownClassName}>
          <div className='sui-time-picker-dropdown-value'>
            {_value.length === 0 ? placeholder : _value.join(':')}
          </div>
          <div className='sui-time-picker-dropdown-box'>
            {
              timeList.map((item, index) => {
                return <div className='sui-time-picker-dropdown-col' key={index}>
                  {
                    item.map((option, _index) => {
                      let selelcted = false
                      if (_value[index] === undefined) {
                        selelcted = _index === 0
                      } else {
                        selelcted = _value[index] === option.value
                      }
                      let className = selelcted ? 'sui-time-picker-dropdown-menu sui-time-picker-dropdown-menu-selected' : 'sui-time-picker-dropdown-menu'
                      option.disabled && (className += ' sui-time-picker-dropdown-menu-disabled')
                      return <div
                        key={option.key}
                        className={className}
                        onClick={
                          () => {
                            if (option.disabled) return
                            for (let i = 0; i < timeList.length; i++) {
                              if (i === index) {
                                _value[i] = option.value
                              } else if (_value[i] === undefined) {
                                _value[i] = '00'
                              }
                            }
                            setvalue([..._value])
                          }
                        }
                      >
                        {option.label}
                      </div>
                    })
                  }
                </div>
              })
            }
          </div>
        </div>
      </>
    }
  </div>
}