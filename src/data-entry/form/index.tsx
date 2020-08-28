import React, { useState } from 'react'
import { Field } from './components'
import {
  Input,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  TimePicker,
  Button,
} from '../../index'
export default ({
  fields,
  btns = [],
  onEvent,
  formStyle
}) => {
  // 按钮事件统一处理
  let forms = Array.isArray(fields) ? fields : []
  forms.forEach(item => item.key = Math.random()) // build key
  const [_fields, setfields] = useState(forms)
  const toolBarClick = (type: string) => {
    if (type === 'submit') {
      // 提交类型需要先做验证
      onEvent(type)
    } else {
      onEvent(type)
    }
  }
  const resolveComponents = (item: any) => {
    if (item.type === 'Input') {
      return <Input {...item.props} />
    } else if (item.type === 'Checkbox') {
      return <Checkbox {...item.props} />
    } else if (item.type === 'CheckboxGroup') {
      return <CheckboxGroup {...item.props} />
    } else if (item.type === 'Select') {
      return (
        <Select {...item.props} />
      )
    } else if (item.type === 'DatePicker') {
      return <DatePicker {...item.props} />
    } else if (item.type === 'Radio') {
      return <Radio {...item.props} />
    } else if (item.type === 'RadioGroup') {
      return <RadioGroup {...item.props} />
    } else if (item.type === 'TimePicker') {
      return <TimePicker {...item.props} />
    }
  }
  return <>
    <div style={formStyle} className='sui-form'>
      <div className='sui-form-body'>
        {
          _fields.sort((a, b) => a.sort > b.sort ? 1 : -1).map((item: any) => {
            return <Field {...item.field} key={item.key}>
              {resolveComponents(item)}
            </Field>
          })
        }
      </div>
      {
        btns.length > 0 && <div className='sui-form-body-btns'>
          {
            btns.map((btn: any) => {
              return <Button
                key={btn.key}
                {...btn.props}
                onClick={toolBarClick.bind(null, btn.type)}
              >
                {btn.label}
              </Button>
            })
          }
        </div>
      }
    </div>
  </>
}