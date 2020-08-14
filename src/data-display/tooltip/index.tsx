import React, { useState, useEffect, useRef } from 'react'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| title               | ReactNode   | 展示的内容       | 无       |
| placement           | string         | 方向          | 无       |
| overlayClassName    | object         | 类名           | 无       |
| overlayStyle        | object          | 样式          | 无       |
| visible             | boolean          | 是否显示    | false       |
| onVisibleChange     | function(visible) | 显示改变的回调    | 无       |
 */
export default ({
  children,
  title,
  placement = 'top',
  overlayClassName,
  overlayStyle = {},
  visible,
  onVisibleChange
}: any) => {
  const [_open, setopen] = useState(visible)
  const [style, setstyle] = useState()
  const toolTipRef = useRef()
  useEffect(() => {
    let style: any = {}
    const { left, width, height, top } = toolTipRef.current.getClientRects()[0]
    if (placement === 'bottom') {
      style.top = top + height + 4
      style.left = left + width / 2
      setstyle(style)
    } else if (placement === 'left') {
      style.top = top - height / 2
      style.left = left
      setstyle(style)
    } else if (placement === 'right') {
      style.top = top - height / 2
      style.left = left + width
      setstyle(style)
    } else { // top default
      style.top = top - height - 4
      style.left = left + width / 2
      setstyle(style)
    }
  }, [])
  /**
   * 组装clasName
   */
  let className = ['sui-tooltip']
  if (placement === 'top') {
    className.push('sui-tooltip-placement-top')
  } else if (placement === 'left') {
    className.push('sui-tooltip-placement-left')
  } else if (placement === 'right') {
    className.push('sui-tooltip-placement-right')
  } else if (placement === 'bottom') {
    className.push('sui-tooltip-placement-bottom')
  }
  if (!_open) {
    className.push('sui-tooltip-hidden')
  }
  if (overlayClassName) {
    className.push(overlayClassName)
  }
  return <>
    <span
      ref={toolTipRef}
      onMouseOver={() => {
        setopen(true)
        typeof onVisibleChange === 'function' && onVisibleChange(true)
      }}
      onMouseOut={() => {
        setopen(false)
        typeof onVisibleChange === 'function' && onVisibleChange(false)
      }}
    >
      {children}
    </span>
    <div
      style={{ overlayStyle, ...style }}
      className={className.join(' ')}
    >
      <div className='sui-tooltip-content'>
        <div className='sui-tooltip-arrow'></div>
        <div className='sui-tooltip-inner' role='tooltip'>{title}</div>
      </div>
    </div>
  </>
}