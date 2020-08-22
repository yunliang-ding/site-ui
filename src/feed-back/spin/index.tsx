/**
| ---------- | --------- | ---------- | --------- |
| loading     | boolean   | 展示的内容   | false   |
| icon        | string    | icon       | 无 |
| style       | object   | 样式       | 无 |
| message     | string   | 提示文案       | 无 |
 */
import React, { useRef, useEffect } from 'react'
import { Icon } from '../../index'
export default ({
  loading,
  icon = 'iconloading1',
  style,
  message,
  children
}:any) => {
  const spinMaskRef = useRef()
  const spinBodyRef = useRef()
  useEffect(()=>{
    if(spinMaskRef.current && spinBodyRef.current){
      spinMaskRef.current.style.width = spinBodyRef.current.firstElementChild.getBoundingClientRect().width + 'px'
      spinMaskRef.current.style.height = spinBodyRef.current.firstElementChild.getBoundingClientRect().height + 'px'
    }
    if(loading){
      spinMaskRef.current.style.display = 'flex'
    }
  }, [loading])
  return <>
    <div className='sui-loading' style={style}>
      <div className='sui-loading-body' ref={spinBodyRef} style={{
        filter: loading ? 'blur(1px)' : 'none',
        opacity: loading ? 0.3 : 1
      }}>
        {children}
      </div>
      {
        loading &&  <div className='sui-loading-mask' ref={spinMaskRef}>
          <div className='sui-loading-mask-spin'>
            <Icon type={icon} />
          </div>
          {message && <span className='sui-loading-mask-message'>{message}</span>}
        </div>
      }
    </div>

  </>
}