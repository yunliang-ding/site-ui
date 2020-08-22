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
  success: 'suiconmessage_SendSuccessfully',
  info: 'suiconwarning',
  warning: 'suiconinfo_warning',
  error: 'suiconcuo'
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
          closable && <Icon type='suiconguanbi' size={14} onClick={setopen.bind(null, false)} />
        }
      </div>
    }
  </>
}