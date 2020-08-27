import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from "react-dom"
import { v4 as uuidv4 } from 'uuid'
const $: any = document.querySelector.bind(document)
export default ({
  overlay,
  children,
  placement = 'bottom',
  open = false
}:any) => {
  const [_open, setopen] = useState(open)
  const [uuid, setuuid] = useState('u' + uuidv4())
  const childrenRef = useRef()
  /**
   * className
   */
  const className = ['sui-dropdown']
  if (!_open) {
    className.push('sui-dropdown-hidden')
  }
  if (placement === 'top') {
    className.push('sui-dropdown-top')
  }
  if (placement === 'bottom') {
    className.push('sui-dropdown-bottom')
  }
  /**
   * 下拉的dom
   */
  const dropDownContainer: any = document.createElement("div")
  dropDownContainer.style.left = 0
  dropDownContainer.style.top = 0
  dropDownContainer.style.width = '100%'
  dropDownContainer.style.height = '100%'
  dropDownContainer.style.position = 'fixed'
  dropDownContainer.setAttribute('id', uuid)
  dropDownContainer.addEventListener('click', setopen.bind(null, false))
  const RenderDropDown = () => {
    return <div className={className.join(' ')}>
      {overlay}
    </div>
  }
  useEffect(() => {
    /**
     * 监听滚动事件
     */
    window.addEventListener('scroll', setPosition)
  }, [])
  const setPosition = () => {
    if (childrenRef && childrenRef.current && $(`#${uuid}`)) {
      const { width, left, top, height } = childrenRef.current.getBoundingClientRect()
      const element = $(`#${uuid}`).firstElementChild
      if(element){
        element.style.width = width + 'px'
        element.style.left = left + 'px'
        element.style.top = top + height + 4 + 'px'
      }
    }
  }
  /**
   * Position
   */
  useEffect(() => {
    if (_open) {
      if ($(`#${uuid}`)) { // 取消隐藏
        $(`#${uuid}`).style.display = 'block'
      } else { // 没有创建
        $('body').appendChild(dropDownContainer)
        ReactDOM.render(<RenderDropDown />, $(`#${uuid}`))
      }
      setTimeout(()=>{
        setPosition()
      })
    } else { // 隐藏
      $(`#${uuid}`) && ($(`#${uuid}`).style.display = 'none')
    }
  }, [_open])
  return <span
    ref={childrenRef}
    style={{
      display: 'inline-block'
    }}
    onClick={setopen.bind(null, !_open)}
  >
    {children}
  </span>
}