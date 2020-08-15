import React, { useState } from 'react'
import { Icon } from '../../index'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| size         | number   | 字体大小       | 18       |
| color        | stirng   | 字体颜色       | 无       |
| style        | Object   | 样式          | 无       |
| type         | string    | icon        | 无       |
| onClick      | function(e) | 点击回调    | 无       |
 */
export default ({
  menus,
  menuClick,
  openKey,
  selectKey,
  style,
  type,
  collapsed,
  collapsedWidth,
  dark
}) => {
  const [_openKey, setopenKey] = useState(openKey || [])
  const [_selectKey, setselectKey] = useState(selectKey || [])
  const isSelected = (menus) => {
    return menus.some(item => {
      if (_selectKey.includes(item.key)) {
        return true
      } else if (item.children) {
        return isSelected(item.children)
      }
    })
  }
  const renderNav = (menus, paddingLeft) => {
    return menus.map(item => {
      let className = ['sui-nav-subMenu']
      /**
       * className
       */
      if (isSelected(item.children)) {
        className.push('sui-nav-subMenu-selected')
      }
      if (_selectKey.includes(item.key)) {
        className.push('sui-nav-subMenu-active')
      }
      if (item.disabled) {
        className.push('sui-nav-subMenu-disabled')
      }
      /**
       * labelClassName
       */
      let labelClassName = ['sui-nav-subMenu-label']
      if (_openKey.includes(item.key)) {
        labelClassName.push('sui-nav-subMenu-label-open')
      }
      return <div
        key={item.key}
        className={className.join(' ')}
        onClick={
          (e) => {
            if (item.children) {
              if (_openKey.includes(item.key)) {
                _openKey.splice(_openKey.findIndex(key => key === item.key), 1) // 删除
              } else {
                _openKey.push(item.key)
              }
              setopenKey([..._openKey])
            } else {
              setselectKey([item.key])
            }
            e.stopPropagation() // 组织冒泡
          }
        }
      >
        <div className={labelClassName.join(' ')} style={{ paddingLeft }}>
          <span className='sui-nav-subMenu-label-left'>
            <Icon type={item.icon} />
            {item.label}
          </span>
          {item.children && <Icon type='iconxialadown' size={16} />}
        </div>
        {
          item.children && <div className={!_openKey.includes(item.key) ? 'sui-nav-subMenu-hidden' : ''}>
            {renderNav(item.children, paddingLeft + 16)}
          </div>
        }
      </div>
    })
  }
  console.log(_openKey)
  return <>
    <div className='sui-nav' style={style}>
      {renderNav(menus, 8)}
    </div>
  </>
}