import React, {useState} from 'react'
import { Button } from '../../index'
import { Field } from './components'
const Form: any = ({
  children,
  onSubmit,
  onSubmitText = '提交'
}) => {
  // 解析所有字段
  let Fields = []
  const [btnloading, setbtnloading] = useState(false)
  const forms = ['Input', 'Select', 'Checkbox', 'Radio', 'AutoComplete']
  /**
   * 提交
   */
  const submit = async () => {
    /**
     * 交验表单
     */
    setbtnloading(true)
    await onSubmit(1,2) // 处理异步请求
    setbtnloading(false)
  }
  const reslove = () => {
    let childrens = []
    if (Object.prototype.toString.call(children) === '[object Array]') {
      childrens = children
    } else if (Object.prototype.toString.call(children) === '[object Object]') {
      childrens.push(children)
    }
    /**
     * 处理子集
     */
    childrens.filter(children => children.type.nickName === 'Field').map(field => {
      let fieldChildrens = []
      if (Object.prototype.toString.call(field.props.children) === '[object Array]') {
        fieldChildrens = field.props.children
      } else if (Object.prototype.toString.call(field.props.children) === '[object Object]') {
        fieldChildrens = [field.props.children]
      }
      Fields.push({
        key: Math.random(),
        label: field.props.label,
        rules: field.props.rules,
        validateStatus: field.props.validateStatus,
        children: fieldChildrens.map(fieldChildren => {
          let formType = fieldChildren.type ? fieldChildren.type.nickName : ''
          return forms.indexOf(formType) > -1 ? {
            ...fieldChildren.props,
            formType,
            key: Math.random(),
            value: field.props.initialValue !== undefined ? field.props.initialValue : fieldChildren.props.value
          } : fieldChildren
        })
      })
    })
  }
  reslove()
  return <div className='sui-form'>
    {
      Fields.map(filed => {
        return <Field {...filed} />
      })
    }
    {
      typeof onSubmit === 'function' && <Button onClick={submit} type='primary' loading={btnloading}>{onSubmitText}</Button>
    }
  </div>
}
Form.Field = Field
export default Form