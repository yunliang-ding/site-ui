import React, { useState } from 'react'
import { Dropdown } from '../../../index'
const MenuHorizontal = ({
  menus,
  openKey,
  selectKey,
  menuClick,
  theme,
  style = {}
}) => {
  const [_openKey, setopenKey] = useState(openKey || [])
  const [_selectKey, setselectKey] = useState(selectKey || [])
  const isSelected = (menus) => { // 判断是否有子节点选中
    return menus.some(item => {
      if (_selectKey.includes(item.key)) {
        return true
      } else if (item.children) {
        return isSelected(item.children)
      }
    })
  }
  const onClick = (item) => {
    console.log(item)
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
      setselectKey([...selectKey])
    }
    typeof menuClick === 'function' && menuClick(_openKey, selectKey)
  }
  /**
   * 
   * @param menus render
   */
  const renderNav = (menus) => {
    return menus.map(menu => {
      const menuClassName = ['sui-menu-horizontal-item']
      if (_selectKey.indexOf(menu.key) > -1 || ( menu.children && isSelected(menu.children) )) {
        menuClassName.push('sui-menu-horizontal-item-selected')
      }
      if (menu.disabled) {
        menuClassName.push('sui-menu-horizontal-item-disabled')
      }
      return <div key={menu.key} className={menuClassName.join(' ')} onClick={
        () => {
          onClick(menu)
        }
      }>
        {
          menu.children ? <Dropdown key={menu.key} overlay={renderNav(menu.children)}>
            {menu.label}
          </Dropdown> : menu.label
        }
      </div>
    })
  }
  let className = theme === 'dark' ? 'sui-menu-horizontal-dark' : 'sui-menu-horizontal'
  return <div className={className} style={style}>
    {
      renderNav(menus)
    }
  </div>
}
export default MenuHorizontal