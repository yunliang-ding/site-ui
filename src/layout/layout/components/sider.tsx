/**
 * 
 */
import React, {useState} from 'react'
import { Icon } from './../../../index'
const Sider = ({
  children,
  trigger,
  collapsible,
  collapsed,
  onCollapse,
  collapsedWidth = 80,
  width,
  theme
}) => {
  const className = ['sui-layout-sider']
  const [_collapsed, setcollapsed] = useState(collapsed)
  if(_collapsed){
    className.push('sui-layout-sider-collapsed')
  }
  if(theme === 'dark'){
    className.push('sui-layout-sider-dark')
  }
  let style:any = {}
  if(width && !_collapsed){
    style.minWidth = width
  } else {
    style.minWidth = collapsedWidth
  }
  return <aside className={className.join(' ')} style={style}>
    {
      collapsible && trigger !== null ? <>
        <div className='sui-layout-sider-children'>
          {children}
        </div>
        <div className='sui-layout-sider-trigger' onClick={
          () => {
            setcollapsed(!_collapsed)
            typeof onCollapse === 'function' && onCollapse(!_collapsed)
          }
        }>
          <Icon type='suiconicon-jiantouzuo' size={20} />
        </div>
      </> : children
    }
  </aside>
}
Sider.nickName = 'Sider'
export default Sider