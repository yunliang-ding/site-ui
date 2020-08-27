import React from 'react'
import { MenuVerical, MenuHorizontal, Item, SubMenu } from './components'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ---------- | ---------------------------- | ------------ | -------- |
| menus      | array                        | 菜单数据     | []       |
| menuClick  | function(openKey, selectKey) | 菜单点击事件 | 无       |
| openKey    | string[]                     | 样式         | 无       |
| selectKey  | string[]                     | icon         | 无       |
| style      | object                       | 点击回调     | 无       |
| collapsed  | boolean                      | 是否收起     | false    |
| theme      | string                       | light/dark   | light    |
 */
const Menu = (props: any) => {
  const loop = (item) => {
    let childrens = []
    if (Object.prototype.toString.call(item) === '[object Array]') {
      childrens = item
    } else if (Object.prototype.toString.call(item) === '[object Object]') {
      childrens.push(item)
    }
    return childrens && childrens.filter(children => ['SubMenu', 'Item'].indexOf(children.type.nickName) > -1).map(children => {
      let obj: any = {
        key: children.key || Math.random(),
        icon: children.props.icon,
        disabled: children.props.disabled,
        label: children.type.nickName === 'SubMenu' ? children.props.title : children.props.children
      }
      if (children.type.nickName === 'SubMenu') { // 子菜单
        obj.children = loop(children.props.children)
      }
      return obj
    })
  }
  let menus = []  // 定义menus
  if (props.children && props.menus === undefined) {
    menus = loop(props.children) // 递归转换
  }
  if (props.menus) {
    menus = props.menus
  }
  return props.mode === 'horizontal'
    ? <MenuHorizontal {...props} menus={menus} />
    : <MenuVerical {...props} menus={menus} />
}
Menu.SubMenu = SubMenu
Menu.Item = Item
export default Menu