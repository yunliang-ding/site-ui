import React, {useState} from 'react'
import { Icon } from '../../index'
export default ({
  style,
  close,
  data,
  activeKey,
  onClick,
  onRemove,
}) => {
  const [_activeKey, setactiveKey] = useState(activeKey)
  const [_data, setdata] = useState(Array.isArray(data) ? data : [])
  const className = ['sui-tabs-header']
  if(close){
    className.push('sui-tabs-close')
  }
  return <>
    <div className='sui-tabs' style={style}>
      <div className={className.join(' ')}>
        {
          data && data.map((tab, index) => {
            return <div key={tab.key} className={_activeKey === tab.key ? 'sui-tabs-header-item-active' : 'sui-tabs-header-item'} onClick={
              () => {
                setactiveKey(tab.key)
                typeof onClick === 'function' && onClick(tab)
              }
            }>
              {tab.label}
              <Icon type='iconguanb' onClick={
                (e) => {
                  e.stopPropagation(); // 阻止往上冒泡
                  _data.splice(index, 1)
                  setdata(_data)
                  setactiveKey(_data[0] && _data[0].key)
                  typeof onRemove === 'function' && onRemove(tab)
                }
              } />
            </div>
          })
        }
      </div>
      <div className='sui-tabs-content'>
        {
          _data && _data.map(tab => {
            return <div key={tab.key} className={_activeKey === tab.key ? 'sui-tabs-content-item-active' : 'sui-tabs-content-item'}>
              {tab.content}
            </div>
          })
        }
      </div>
    </div>
  </>
}