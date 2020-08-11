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
 */
import React, { useState, useEffect } from 'react'
import { Icon, Empty } from '../../index'
export default ({
  options,
  value,
  allowClear = true,
  placeholder,
  disabled = false,
  style = {},
  dropdownClassName,
  dropdownStyle = {},
  onChange,
  open = false
}: any) => {
  const transfrom = (options, values) => { // 数组转为对象数组
    let level = -1
    const loop = (value, index, options) => { // 递归查找树结构
      level++
      return options.find(option => {
        if (option.value === value && level === index) { // 层级需要一致
          updateList(options, index) // 更新存储的options容器
          return true
        } else if (option.children) {
          return loop(value, index, option.children)
        }
        return false
      })
    }
    return values.map((value, index) => {
      return loop(value, index, options)
    })
  }
  /**
   * value Change
   */
  useEffect(() => {
    const values = transfrom(options, value || []).filter(item => !item)
    setselected(values) // 回显
    setvalue(values) // 回显
  }, [value])
  const updateList = (options, index) => { // 更新存储的options容器
    list[index] = options.map(option => {
      option.key = Math.random()
      return option
    })
    setlist([...list.slice(0, index + 1)]) // clear 后面的数组
  }
  /**
   * 数据转化 转为2维数组渲染
   */
  const [list, setlist] = useState([]) // 存储options容器
  const [_value, setvalue] = useState([]) // 内部存选中值容器
  const [selected, setselected] = useState([]) // 最终选中的指
  const [_open, setopen] = useState(open)
  /**
   * 内部状态
   */
  let className = _open ? 'sui-cascader sui-cascader-open' : 'sui-cascader'
  disabled && (className += ' sui-cascader-disabled')
  const dropDownClassName = dropdownClassName ? dropdownClassName + ' sui-cascader-dropdown' : 'sui-cascader-dropdown'
  /**
  * _open Change
  */
  useEffect(() => {
    if (_open) { // 设置选中值
      const values = transfrom(options, selected.map(item => item.value)).filter(item => item !== undefined)
      console.log('values-->', values)
      setselected(values) // 回显
      setvalue(values) // 回显
    } else { // clear
      setvalue([]) // clear
      updateList(options, 0) // clear
    }
  }, [_open])
  /**
   * 显示的文案
   */
  const label = selected.map(item => item.label).join('/')
  /**
   * JSX
   */
  return <div className={className} style={style}>
    <div className='sui-cascader-selection' onClick={
      () => {
        if (disabled) return
        setopen(!_open)
      }
    }>
      <div className='sui-cascader-selection-selected-value' title={label}>
        {selected.length === 0 ? <span style={{ color: '#aaa' }}>{placeholder}</span> : label}
      </div>
      <Icon type='iconxialadown' />
      {
        !disabled && allowClear && selected.length > 0 && <Icon type='iconcuo' onClick={
          (e) => {
            e.stopPropagation() // 阻止冒泡
            setvalue([]) // 还原
            updateList(options, 0) // 还原
            setselected([]) // 还原
            typeof onChange === 'function' && onChange([], null)
          }
        } />
      }
    </div>
    {
      _open && <>
        <div className='sui-cascader-mask' onClick={setopen.bind(null, false)} />
        <div style={dropdownStyle} className={dropDownClassName}>
          {
            list.length > 0 ? list.map((item, index) => {
              return <div className='sui-cascader-dropdown-col' key={index}>
                {
                  item.map(option => {
                    let className = _value.some(item => item.value === option.value) ? 'sui-cascader-dropdown-menu sui-cascader-dropdown-menu-selected' : 'sui-cascader-dropdown-menu'
                    option.disabled && (className += ' sui-cascader-dropdown-menu-disabled')
                    return <div
                      key={option.key}
                      className={className}
                      onClick={
                        () => {
                          if (option.disabled) return
                          _value[index] = option
                          if (option.children) {
                            setvalue([..._value.slice(0, index + 1)]) // clear
                            updateList(option.children, index + 1)
                          } else {
                            setopen(false)
                            setselected([..._value]) // 最终选择的值simple deep解除依赖
                            typeof onChange === 'function' && onChange(_value.map(item => item.value), option)
                          }
                        }
                      }
                    >
                      {option.label}
                      {option.children && <Icon type='iconjiantou2' size={14} />}
                    </div>
                  })
                }
              </div>
            }) : <Empty label='暂无数据' />
          }
        </div>
      </>
    }
  </div>
}