import React, { useState } from 'react'
import { Icon, Checkbox } from '../../../index'
export default ({
  treeData = [],
  expandedKeys,
  checkable = false,
  checkedKeys,
  disabled = false,
  onCheck,
  onExpand,
  onSelected,
  style,
}: any) => {
  const [_expandedKeys, setexpandedKeys] = useState(expandedKeys || [])
  const [_checkedKeys, setcheckedKeys] = useState(checkedKeys || [])
  const [_selectedKeys, setselectedKeys] = useState('')
  const renderTree = (treeData, paddingLeft) => {
    return treeData.map(item => {
      let className = ['sui-tree-node']
      /**
       * className
       */
      if (item.disabled || disabled) {
        className.push('sui-tree-node-disabled')
      }
      /**
       * labelClassName
       */
      let labelClassName = ['sui-tree-node-label']
      if (_expandedKeys.includes(item.key)) {
        labelClassName.push('sui-tree-node-label-open')
      }
      if (item.children) {
        labelClassName.push('sui-tree-node-parent')
      }
      return <div
        key={item.key}
        className={className.join(' ')}
      >
        <div className={labelClassName.join(' ')} style={{ paddingLeft }}>
          {
            item.children && <Icon type='suiconxialadown' onClick={
              (e) => {
                if(item.disabled || disabled)return
                e.stopPropagation() // 阻止冒泡
                if (_expandedKeys.includes(item.key)) {
                  _expandedKeys.splice(_expandedKeys.findIndex(key => key === item.key), 1) // 删除
                } else {
                  _expandedKeys.push(item.key)
                }
                setexpandedKeys([..._expandedKeys])
                typeof onExpand === 'function' && onExpand(_expandedKeys)
              }
            } />
          }
          <span className='sui-tree-node-label-left' title={item.label}>
            {
              checkable ? <>
                <Checkbox disabled={item.disabled || disabled} checked={_checkedKeys.includes(item.key)} onChange={
                  () => {
                    let findIndex = _checkedKeys.findIndex(key => {
                      return key === item.key
                    })
                    if (findIndex > -1) {
                      _checkedKeys.splice(findIndex, 1)
                    } else {
                      _checkedKeys.push(item.key)
                    }
                    setcheckedKeys([..._checkedKeys])
                    typeof onCheck === 'function' && onCheck(_checkedKeys)
                  }
                }>
                  <span className='sui-tree-node-label-left-text'>{item.label}</span>
                </Checkbox>
              </> : <span className={_selectedKeys !== item.key ? 'sui-tree-node-label-left-text' : 'sui-tree-node-label-left-text-active'} onClick={
                () => {
                  if(item.disabled || disabled)return
                  setselectedKeys(item.key)
                  typeof onSelected === 'function' && onSelected(item.key)
                }
              }>{item.label}</span>
            }
          </span>
        </div>
        {
          item.children && <div className={!_expandedKeys.includes(item.key) ? 'sui-tree-node-hidden' : ''}>
            {renderTree(item.children, paddingLeft + 34)}
          </div>
        }
      </div>
    })
  }
  return <>
    <div className='sui-tree' style={style}>
      {
        renderTree(treeData, 10)
      }
    </div>
  </>
}