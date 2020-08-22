
import React, { useState, useEffect } from 'react'
import { Icon } from '../../index'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| checked    | Boolean   | 指定当前是否选中	           | true       |
| checkedChildren   | ReactNode   | 选中时的内容	          | 无       |
| unCheckedChildren     | ReactNode      | 非选中时的内容	               |  无        |
| disabled         | Boolean      | 是否禁用状态          | false         |
| loading      | Boolean     |    是否加载状态 | false      |
| onChange        | Function(checked: boolean, event: Event)   | 变化时回调函数	          | 无         |
| style         | Object      | 样式                 | 无      |
 */
export default ({
  checked = true,
  checkedChildren,
  unCheckedChildren,
  disabled = false,
  loading = false,
  onChange,
  style = {}
}: any) => {
  const [_checked, setchecked] = useState(checked)
  let className = _checked ? 'sui-switch-checked' : 'sui-switch'
  if (disabled || loading) {
    className += ' sui-switch-disabled'
  }
  let innerText = _checked ? checkedChildren : unCheckedChildren
  useEffect(() => {
    setchecked(checked)
  }, [checked])
  return <button
    className={className}
    style={style}
    onClick={
      (e) => {
        if (disabled || loading) return
        setchecked(!_checked)
        typeof onChange === 'function' && onChange(!_checked, e)
      }
    }
  >
    {
      loading && <Icon type='suiconloading' size={10} />
    }
    <span className='sui-switch-inner'>{innerText}</span>
    <div className='sui-click-animating-node' />
  </button>
}