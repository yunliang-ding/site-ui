/**
| title      | array      | 标题            | 无       |
| closable   | boolean    | 是否可关闭      | false    |
| visible    | boolean    | 是否展示        | 无       |
| style      | object     | 样式            | 无       |
| onClose    | funciton() | 取消按钮回调    | 无       |
| onOk       | funciton() | 确定按钮回调    | 无       |
| footer     | object     | 是否显示 Footer | 无       |
| mask       | boolean    | 是否显示遮罩层  | 无       |
 */
import React, { useState, useEffect } from 'react'
import { Button, Icon } from '../../index'
export default ({
  title,
  closable,
  visible,
  onClose,
  onOk,
  children,
  footer,
  mask,
  style = {}
}) => {
  useEffect(() => {
    setvisible(visible)
  }, [visible])
  const [_visible, setvisible] = useState(visible)
  const close = () => {
    setvisible(false)
    typeof onClose === 'function' && onClose()
  }
  const ok = () => {
    close()
    typeof onOk === 'function' && onOk()
  }
  return <>
    {
      _visible === true && <div className='sui-modal' style={style}>
        <div className='sui-modal-header'>
          <div>
            {title}
          </div>
          {closable && <Icon type='suiconguanbi' onClick={close} />}
        </div>
        <div className='sui-modal-body' style={{
          height: footer === false ? 'calc(100% - 50px)' : 'calc(100% - 100px)'
        }}>
          {children}
        </div>
        {
          footer !== false && <div className='sui-modal-footer'>
            {
              (footer === null || footer === undefined) ? <>
                <Button type='primary' style={{ width: 60 }} onClick={ok}>确定</Button>
                <Button style={{ width: 60 }} onClick={close} >取消</Button>
              </> : footer
            }
          </div>
        }
      </div>
    }
    {_visible === true && <div className={mask !== false ? 'sui-modal-mask' : 'sui-modal-mask-none'} onClick={close} />}
  </>
}