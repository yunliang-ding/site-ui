import React, { useState, useEffect, useRef } from 'react'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ---------------- | ----------------- | -------------- | -------- |
| title            | ReactNode         | 展示的内容     | 无       |
| placement        | string            | 方向           | 无       |
| overlayClassName | object            | 类名           | 无       |
| overlayStyle     | object            | 样式           | 无       |
| innerStyle       | object            | 内部盒子样式   | 无       |
| visible          | boolean           | 是否显示       | false    |
| onVisibleChange  | function(visible) | 显示改变的回调 | 无       |
| theme            | string            | light/dark     | light    |
 */
export default ({
  children,
  title,
  placement = 'top',
  overlayClassName,
  overlayStyle = {},
  visible,
  onVisibleChange,
  innerStyle,
  theme
}: any) => {
  const [_open, setopen] = useState(visible)
  const [style, setstyle] = useState()
  const toolTipRef = useRef()
  const toolTipInnerRef = useRef()
  // debounce 防抖
  const debounce = (fn, delay = 10) => {
    if (typeof fn !== 'function') { // 参数类型为函数
      throw new TypeError('fn is not a function');
    }
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, ...args);
      }, delay);
    }
  }
  useEffect(() => {
    setPosition()
  }, [title])
  const setPosition = () => {
    if (toolTipRef.current) {
      let style: any = {}
      let element = toolTipRef.current.firstElementChild ? toolTipRef.current.firstElementChild : toolTipRef.current
      const { left, width, height, top } = element.getBoundingClientRect();
      if (placement === 'top') {
        style.top = top
        style.left = left + width / 2
      } else if (placement === 'bottom') {
        style.top = top + height
        style.left = left + width / 2
      } else if (placement === 'left') {
        style.top = top + height / 2
        style.left = left
      } else if (placement === 'right') {
        style.top = top + height / 2
        style.left = left + width
      } else { // top default
        style.top = top
        style.left = left + width / 2
      }
      setstyle(style)
    }
  }
  useEffect(() => {
    /**
     * 监听滚动事件
     */
    window.addEventListener('scroll', debounce(() => {
      setPosition()
    }))
  }, [])
  useEffect(() => {
    setPosition()
  }, [_open])
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
  if (overlayClassName) {
    className.push(overlayClassName)
  }
  if (theme === 'dark') {
    className.push('sui-tooltip-dark')
  }
  return <div className={_open || visible ? 'sui-tooltip-wrapper' : 'sui-tooltip-wrapper-hidden'}>
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
      style={{ ...overlayStyle, ...style }}
      className={className.join(' ')}
    >
      <div className='sui-tooltip-content'>
        <div className='sui-tooltip-arrow'></div>
        <div style={innerStyle} className='sui-tooltip-inner' ref={toolTipInnerRef}>{title}</div>
      </div>
    </div>
  </div>
}