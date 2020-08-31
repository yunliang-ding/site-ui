/**
| -------------- | --------------- | ------------ | -------- |
| overlay          | ReactNode          | 渲染的body           | 无        |
| style          | object          | 滑块样式     | 无       |
 */
import React, { useState, useRef, useEffect } from 'react'
import { Layer } from '../../index'
export default ({
  overlay,
  children,
  style,
}: any) => {
  const [open, setopen] = useState(false) // 默认不显示
  const [_style, setstyle] = useState(style || {})
  const childrenRef = useRef()
  // 获取位置
  useEffect(() => {
    if (childrenRef && childrenRef.current) {
      const { left, top, height, width } = childrenRef.current.getBoundingClientRect()
      const { offsetTop, offsetLeft } = childrenRef.current
      setstyle({
        left: offsetLeft,
        top: offsetTop + height + 4,
        width,
        minWidth: 140,
        height: 'max-content',
        ...style
      })
    }
  }, [])
  return <>
    <span
      ref={childrenRef}
      style={{
        display: 'inline-block'
      }}
      onClick={setopen.bind(null, true)}
    >
      {children}
    </span>
    <Layer
      style={_style}
      open={open}
      close={setopen.bind(null, false)}
    >
      {overlay}
    </Layer>
  </>
}