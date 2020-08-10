import React from 'react'
import { Icon } from '../../index'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------  | --------------------     | ------------ | ---------- |
| disabled      | boolean    |  是否禁用       | 20       |
| onClick       | function(e)   | 点击的回调       | 20       |
| icon          | string      | 图标       | 20       |
| loading       | boolean   | 是否加载       | 20       |
| type          | string   | 主题       | 20       |
| style         | object   | 样式       | 20       |
 */
export default ({
  disabled,
  ghost,
  onClick,
  icon,
  loading,
  type,
  style,
  children
}: any) => {
  let className = 'sui-btn'
  if (type) {
    className += ' sui-btn-' + type
  }
  if (ghost) {
    className += ' sui-btn-ghost'
  }
  if (disabled) {
    className += ' sui-btn-disabled'
  }
  if (loading) {
    className += ' sui-btn-loading'
  }
  return <button className={className} style={style} onClick={
    (e: any) => {
      if (disabled) return
      typeof onClick === 'function' && onClick(e)
    }
  }>
    {
      loading && <Icon type='iconloading' />
    }
    {
      icon && <Icon type={icon} />
    }
    {children}
  </button>
}