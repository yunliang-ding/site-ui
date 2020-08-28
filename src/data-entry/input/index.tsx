import React from 'react'
import { AddonBefore, AddonAfter, TextArea, Input } from './components'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------ | -------------------- | ------------ | ---------- |
| addonAfter    | ReactNode   | 设置前置标签           | 无       |
| addonBefore   | ReactNode   | 设置后置标签          | 无       |
| value         | string      | 输入框默认内容          | 无         |
| disabled      | boolean     | 是否禁用状态            | false      |
| maxLength     | number      | 最大长度               |  无        |
| prefix        | ReactNode   | 带有前缀图标的          | 无         |
| suffix        | ReactNode   | 带有后缀图标的          | 无      |
| type          | string      | input 类型             | input      |
| allowClear    | boolean     | 可以点击清除图标删除内容   | false      |
| onChange      | function(e) | 输入框内容变化时的回调    | 无      |
| onPressEnter  | function(e) | 按下回车的回调         | 无      |
| onBlur        | function(e) | 输入框得到焦点         | 无      |
| onFocus       | function(e) | 输入框失去焦点         | 无      |
| onAllowClear  | function(e) | 清除的回调            | 无      |
| style         | Object      | 样式                 | 无      |
 */
const InputWrapper = (props: any) => {
  return <span
    style={props.style}
    className={props.type === 'textarea' ? 'sui-textarea-wrapper' : 'sui-input-wrapper'}
  >
    <AddonBefore addon={props.addonBefore} />
    {
      props.type === 'textarea' ? <TextArea {...props} /> : <Input {...props} />
    }
    <AddonAfter addon={props.addonAfter} />
  </span>
}
InputWrapper.nickName = 'Input'
export default InputWrapper