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
  content,
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
  let _style = {...style}
  if (placement === 'left') {
    _style.left = 0
    _style.right = 'auto'
  } else {
    _style.right = 0
    _style.left = 'auto'
  }
  return <>
    {
      _visible === true && <div className='sui-drawer' style={_style}>
        <div className='sui-drawer-header'>
          <div>
            {title}
          </div>
          {closable && <Icon type='iconguanbi' onClick={close} />}
        </div>
        {mask !== false && <div className='sui-drawer-mask' onClick={close} />}
        <div className='sui-drawer-body' style={{
          height: footer === false ? 'calc(100% - 50px)' : 'calc(100% - 100px)'
        }}>
          {content}
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
  </>
}