/**
| title      | array              | 标题            | 无       |
| closable   | boolean            | 是否可关闭      | false    |
| placement  | string(left/right) | 左边和右边展示  | 无       |
| visible    | boolean            | 是否展示        | 无       |
| style      | object             | 样式            | 无       |
| onClose    | funciton()         | 取消按钮回调    | 无       |
| onOk       | funciton()         | 确定按钮回调    | 无       |
| footer     | object             | 是否显示 Footer | 无       |
| mask       | boolean            | 是否显示遮罩层  | 无       |
 */
import React, { useState, useEffect } from 'react'
import { Button, Icon } from '../../index'
export default ({
  title,
  closable,
  placement,
  visible = false,
  style={},
  onClose,
  onOk,
  children,
  footer,
  mask
}:any) => {
  const [_visible, setvisible] = useState(visible)
  useEffect(() => {
    setvisible(visible)
  }, [visible])
  const close = () => {
    setvisible(false)
    typeof onClose === 'function' && onClose()
  }
  const ok = () => {
    close()
    typeof onOk === 'function' && onOk()
  }
  let className = ['sui-drawer']
  if(placement === 'left'){
    className.push('sui-drawer-left')
  }
  return <>
    {
      _visible === true && <div className={className.join(' ')} style={style}>
        <div className='sui-drawer-header'>
          <div>
            {title}
          </div>
          {closable && <Icon type='iconguanbi' onClick={close} />}
        </div>
        <div className='sui-drawer-body' style={{
          height: footer === false ? 'calc(100% - 50px)' : 'calc(100% - 100px)'
        }}>
          {children}
        </div>
        {
          footer !== false && <div className='sui-drawer-footer'>
            {
              footer === null ? <>
                <Button type='primary' style={{ width: 60 }} onClick={ok}>确定</Button>
                <Button style={{ width: 60 }} onClick={close}>取消</Button>
              </> : footer
            }
          </div>
        }
      </div>
    }
    {_visible === true && <div className={mask !== false ? 'sui-drawer-mask' : 'sui-drawer-mask-none'} onClick={close} />}
  </>
}