import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from "react-dom"
import { v4 as uuidv4 } from 'uuid'
import { Icon, Empty } from '../../../index'
import { Option } from './index'
const $: any = document.querySelector.bind(document)
const Select = ({
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
    setvalue(value) // update
  }, [value])
  useEffect(() => {
    setoptions(options) // update
  }, [options])
  const [_open, setopen] = useState(open)
  const [_options, setoptions] = useState(options)
  const [_value, setvalue] = useState(value)
  const selected: any = _options.find(item => item.value === _value) || {} // 选中项
  const [keyword, setkeyword] = useState()
  const [_placeholder, setplaceholder] = useState(selected.label || placeholder)
  const [uuid, setuuid] = useState('u' + uuidv4())
  const [position, setposition] = useState(null)
  /**
   * 页面加载完确定层的位置
   */
  const setPosition = () => {
    if(selectionRef.current){
      const { width, left, top, height } = selectionRef.current.getBoundingClientRect()
      setposition({
        width,
        left,
        top,
        height
      })
    }
  }
  useEffect(() => {
    setPosition()
  }, [])
  let className = _open ? 'sui-select sui-select-open' : 'sui-select'
  disabled && (className += ' sui-select-disabled')
  const dropDownClassName = dropdownClassName ? dropdownClassName + ' sui-select-dropdown' : 'sui-select-dropdown'
  useEffect(() => {
    /**
     * 监听滚动事件
     */
    window.addEventListener('scroll', setPosition)
  }, [])
  /**
   * ref
   */
  const selectionRef = useRef()
  /**
   * 下拉的dom
   */
  const selectDropDownContainer: any = document.createElement("div")
  selectDropDownContainer.style.left = 0
  selectDropDownContainer.style.top = 0
  selectDropDownContainer.style.width = '100%'
  selectDropDownContainer.style.position = 'absolute'
  selectDropDownContainer.setAttribute('id', uuid)
  /**
   * render 下拉的dom
   */
  const RenderDropDown = () => {
    if (position) {
      const { width, left, top, height } = position
      return <div>
        <div className='sui-select-mask' onClick={setopen.bind(null, false)} />
        <div style={{
          ...dropdownStyle,
          width,
          left,
          top: top + height + 4
        }} className={dropDownClassName}>
          {
            _options.length > 0 ? _options.map(option => {
              let className = option.value === _value ? 'sui-select-dropdown-menu sui-select-dropdown-menu-selected' : 'sui-select-dropdown-menu'
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
                    setvalue(option.value)
                    typeof onChange === 'function' && onChange(option.value, option)
                  }
                }
              >
                {option.label}
              </div>
            }) : <Empty label='暂无数据' />
          }
        </div>
      </div>
    }
    return null
  }
  useEffect(() => {
    if ($(`#${uuid}`)) {
      ReactDOM.render(<RenderDropDown />, $(`#${uuid}`))
    }
  }, [_value, _options, position])
  useEffect(() => {
    if (_open) {
      if ($(`#${uuid}`)) { // 取消隐藏
        $(`#${uuid}`).style.display = 'block'
      } else { // 没有创建
        $('body').appendChild(selectDropDownContainer)
        ReactDOM.render(<RenderDropDown />, $(`#${uuid}`))
      }
    } else { // 隐藏
      $(`#${uuid}`) && ($(`#${uuid}`).style.display = 'none')
    }
  }, [_open])
  return <div className={className} style={style}>
    <div ref={selectionRef} className='sui-select-selection' onClick={
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
              onBlur={
                () => {
                  setkeyword('') // 清空 keyword
                  setTimeout(() => { // 避免闪动
                    setoptions(options) // 重制 options
                  }, 500)
                }
              }
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
      <Icon type='suiconxialadown' />
      {
        !disabled && allowClear && selected.value !== undefined && <Icon type='suiconcuo' onClick={
          (e) => {
            e.stopPropagation() // 阻止冒泡
            typeof onChange === 'function' && onChange(null, null)
          }
        } />
      }
    </div>
  </div>
}
Select.Option = Option
export default Select