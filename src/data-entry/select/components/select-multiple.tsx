import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from "react-dom"
import { v4 as uuidv4 } from 'uuid'
import { Icon, Empty } from '../../../index'
const $: any = document.querySelector.bind(document)
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
  useEffect(() => {
    setvalue(Array.isArray(value) ? value : [])
  }, [value])
  useEffect(() => {
    setoptions(options) // update
  }, [options])
  const [_open, setopen] = useState(open)
  const [uuid, setuuid] = useState('u' + uuidv4())
  const [_options, setoptions] = useState(options)
  const [position, setposition] = useState(null)
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
  * 页面加载完确定层的位置
  */
  const selectSelectionWapper = useRef()
  const selectValueWapper = useRef()
  useEffect(() => {
    setPosition()
  }, [])
  /**
   * 
   */
  const setPosition = () => {
    if (selectValueWapper.current) {
      const { width, left, top, height } = selectValueWapper.current.getBoundingClientRect()
      setposition({
        width: width + 20,
        left: left - 10,
        top,
        height
      })
    }
  }
  useEffect(() => {
    /**
     * 监听滚动事件
     */
    window.addEventListener('scroll', setPosition)
  }, [])
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
                <Icon size={14} type='suiconduihao' />
              </div>
            }) : <Empty />
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
  // 调整高度
  useEffect(() => {
    selectSelectionWapper.current.style.height = selectValueWapper.current.getBoundingClientRect().height + 'px'
    setPosition()
  }, [_value])
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
  /**
   * Virtual-Dom
   */
  return <div className={className} style={style}>
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
                  <Icon size={14} type='suiconguanbi' onClick={
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
      <Icon type='suiconxialadown' />
      {
        !disabled && allowClear && selected.length > 0 && <Icon size={14} type='suiconcuo' onClick={
          (e) => {
            e.stopPropagation() // 阻止冒泡
            typeof onChange === 'function' && onChange([], null)
          }
        } />
      }
    </div>
  </div>
}