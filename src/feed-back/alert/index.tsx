/**
| ---------- | ---------------------------- | ------------ | -------- |
| message    | array                        | 文案     | 无       |
| closable   | function(openKey, selectKey) | 是否可关闭 | false       |
| type       | string                    | 类型         | 无       |
| style      | object                    | 样式         | 无       |
 */
import React, {useState} from "react"
import { Icon } from '../../index'
const iconMapping = {
  success: 'iconmessage_SendSuccessfully',
  info: 'iconwarning',
  warning: 'iconinfo_warning',
  error: 'iconcuo'
}
export default ({
  message,
  closable = false,
  type,
  style
}) => {
  const [open, setopen] = useState(true)
  return <>
    {
      open && <div className={`sui-alert sui-alert-${type}`} style={style}>
        <div className='sui-alert-message'>
          <Icon type={iconMapping[type]} />
          <span>{message}</span>
        </div>
        {
          closable && <Icon type='iconguanbi' size={14} onClick={setopen.bind(null, false)} />
        }
      </div>
    }
  </>
}