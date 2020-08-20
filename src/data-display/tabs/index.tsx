import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '../../index'
export default ({
  style,
  closeable,
  data,
  activeKey,
  onClick,
  onRemove,
}) => {
  useEffect(() => {
    setindex(activeKey)
  }, [activeKey])
  const [_index, setindex] = useState(activeKey || 0)
  const [_data, setdata] = useState(Array.isArray(data) ? data : [])
  const className = ['sui-tabs-header']
  const tabsRef = useRef()
  const borderRef = useRef()
  const activeItemRef = useRef()
  /**
   * 调整下划线位置
   */
  useEffect(()=>{
    if(activeItemRef.current){
      borderRef.current.style.width = activeItemRef.current.getBoundingClientRect().width + 'px'
      borderRef.current.style.left =  activeItemRef.current.getBoundingClientRect().left - tabsRef.current.getBoundingClientRect().left + 'px'
    }
  }, [_index])
  return <>
    <div className='sui-tabs' style={style} ref={tabsRef}>
      <div className={className.join(' ')}>
        {
          _data.map((tab, index) => {
            return <div ref={_index === index ? activeItemRef : null} key={tab.key} className={_index === index ? 'sui-tabs-header-item-active' : 'sui-tabs-header-item'} onClick={
              () => {
                setindex(index)
                typeof onClick === 'function' && onClick(tab)
              }
            }>
              {tab.label}
              {
                closeable && <Icon type='iconguanbi' size={13} onClick={
                  (e) => {
                    e.stopPropagation(); // 阻止往上冒泡
                    _data.splice(index, 1)
                    setdata([..._data])
                    setindex(0)
                    typeof onRemove === 'function' && onRemove(tab)
                  }
                } />
              }
            </div>
          })
        }
        {
          _data.length > 0 && <>
          < div className='sui-tabs-header-border' />
            <div className='sui-tabs-item-active-border' ref={borderRef} />
          </>
        }
      </div>
      <div className='sui-tabs-content'>
        {
          _data && _data.map((tab,index) => {
            return <div
              key={tab.key}
              className={'sui-tabs-content-item'}
              style={{
                left: (index - _index) * 100 + '%'
              }}
            >
              {tab.content}
            </div>
          })
        }
      </div>
    </div>
  </>
}