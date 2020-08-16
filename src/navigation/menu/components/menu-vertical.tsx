import React, { useState } from 'react'
import { Icon, Tooltip } from '../../../index'
export default ({
  menus,
  menuClick,
  openKey,
  selectKey,
  style,
  collapsed,
  theme
}: any) => {
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
  const renderNav = (item, labelClassName, paddingLeft) => {
    return <>
      <div className={labelClassName.join(' ')} style={{ paddingLeft }}>
        <span className='sui-nav-subMenu-label-left' title={item.label}>
          <Icon type={item.icon} />
          <span>{item.label}</span>
        </span>
      </div>
      {
        item.children && <div className={!_openKey.includes(item.key) ? 'sui-nav-subMenu-hidden' : ''}>
          {renderMenus(item.children, paddingLeft)}
        </div>
      }
    </>
  }
  const renderCollapsedNav = (item, labelClassName, paddingLeft) => {
    return <>
      <div className={labelClassName.join(' ')} style={{ paddingLeft }}>
        <span className='sui-nav-subMenu-label-left' title={item.label}>
          <Icon type={item.icon} />
          <span>{item.label}</span>
        </span>
      </div>
      {
        item.children && <div className={!_openKey.includes(item.key) ? 'sui-nav-subMenu-hidden' : ''}>
          {renderMenus(item.children, paddingLeft)}
        </div>
      }
    </>
  }
  const renderMenus = (menus, paddingLeft) => {
    return menus.map(item => {
      let className = ['sui-nav-subMenu']
      /**
       * className
       */
      if (item.children && isSelected(item.children)) {
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
      if (item.children) {
        labelClassName.push('sui-nav-subMenu-parent')
      }
      return <div
        key={item.key}
        className={className.join(' ')}
        onClick={
          (e) => {
            e.stopPropagation() // 阻止冒泡
            if (item.disabled) return;
            let selectKey = _selectKey
            if (item.children) {
              if (_openKey.includes(item.key)) {
                _openKey.splice(_openKey.findIndex(key => key === item.key), 1) // 删除
              } else {
                _openKey.push(item.key)
              }
              setopenKey([..._openKey])
            } else {
              selectKey = [item.key]
              setselectKey(selectKey)
            }
            typeof menuClick === 'function' && menuClick(_openKey, selectKey)
          }
        }
      >
        {
          collapsed
            ? renderNav(item, labelClassName, paddingLeft)
            : renderCollapsedNav(item, labelClassName, paddingLeft)
        }
      </div>
    })
  }
  return <>
    <div className='sui-nav' style={{
      ...style,
      width: collapsed ? 80 : style.width
    }}>
      {
        renderMenus(menus, 8)
      }
      {}
    </div>
  </>
}