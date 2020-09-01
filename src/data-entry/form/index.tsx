import React, { useState, useEffect } from 'react'
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
} from '../../index'
export default ({
  fields,
  onValueChanges,
  onLoad,
  formStyle,
  flex,
  columns = 2
}) => {
  /**
   * 内部观测数据
   */
  let forms = Array.isArray(fields) ? fields : []
  forms.forEach(item => item.key = Math.random()) // build key
  const [_fields, setfields] = useState(JSON.parse(JSON.stringify(forms))) // deep
  /**
   * 校验单个字段
   */
  const validateField = (fieldName) => {
    let item = _fields.find(item => item.name === fieldName)
    let error, value;
    if (item.field.rules && Object.prototype.toString.call(item.field.rules) === '[object Array]') {
      item.field.rules.some(rule => {
        if (rule.required === true) { // 校验必填
          if (
            item.props.value === '' ||
            item.props.value === undefined ||
            item.props.value === null ||
            (Object.prototype.toString.call(item.props.value) === '[object Array]' && item.props.value.length === 0)
          ) {
            error = { field: item.name, message: rule.message }
            item.field.validateStatus = 'error'
            item.field.message = rule.message
            return true
          } else {
            item.field.validateStatus = null
            item.field.message = null
            value = item.props.value
          }
        } else if (rule.pattern) { // 校验正则
          if (!new RegExp(rule.pattern).test(item.props.value)) {
            error = { field: item.name, message: rule.message }
            item.field.validateStatus = 'error'
            item.field.message = rule.message
            return true
          } else {
            item.field.validateStatus = null
            item.field.message = null
            value = item.props.value
          }
        }
      })
    }
    return {
      error, value
    }
  }
  /**
  * 校验整个表单
  */
  const validateForm = (callBack) => {
    let errors = [] // 封装错误信息
    let values = {}
    _fields.map(field => {
      let { error, value } = validateField(field.name)
      if (error !== undefined) {
        errors.push(error)
      }
      if (value !== undefined) {
        values[field.name] = value
      }
    })
    if (errors.length > 0) {
      setfields([..._fields]) // 提示信息
    }
    return callBack({
      errors: errors.length === 0 ? false : errors,
      values
    })
  }
  /**
   * 是否提交
   */
  useEffect(() => {
    typeof onLoad === 'function' && onLoad({
      validateForm
    })
  }, [])
  /**
   * field update
   * @param name 
   * @param e 
   */
  const eventTouch = (name, e) => {
    // 1:先按照name查找到props的fields,执行field自带的onChange
    let field = forms.find(form => form.name === name)
    if (field && field.props.onChange) {
      field.props.onChange(e)
    }
    // 2:内部自动执行双向绑定的自定义事件,赋值
    let _field = _fields.find(field => field.name === name)
    if (_field) {
      _field.props.value = (e && e.target) ? e.target.value : e
      // 3:开始校验
      validateField(_field.name)
      setfields([..._fields]) // render
    }
    // 4:调用外层 onValueChanges
    typeof onValueChanges === 'function' && onValueChanges(name, e)
  }
  const resolveComponents = (item: any) => {
    if (item.type === 'Input') {
      return <Input {...item.props} onChange={
        (e) => {
          eventTouch(item.name, e)
        }
      } />
    } else if (item.type === 'Checkbox') {
      return <Checkbox {...item.props} onChange={
        (e) => {
          eventTouch(item.name, e)
        }
      } />
    } else if (item.type === 'CheckboxGroup') {
      return <CheckboxGroup {...item.props} onChange={
        (e) => {
          eventTouch(item.name, e)
        }
      } />
    } else if (item.type === 'Select') {
      return (
        <Select {...item.props} onChange={
          (e) => {
            eventTouch(item.name, e)
          }
        } />
      )
    } else if (item.type === 'DatePicker') {
      return <DatePicker {...item.props} onChange={
        (e) => {
          eventTouch(item.name, e)
        }
      } />
    } else if (item.type === 'Radio') {
      return <Radio {...item.props} onChange={
        (e) => {
          eventTouch(item.name, e)
        }
      } />
    } else if (item.type === 'RadioGroup') {
      return <RadioGroup {...item.props} onChange={
        (e) => {
          eventTouch(item.name, e)
        }
      } />
    } else if (item.type === 'TimePicker') {
      return <TimePicker {...item.props} onChange={
        (e) => {
          eventTouch(item.name, e)
        }
      } />
    }
  }
  const className = ['sui-form']
  if (flex) {
    className.push('sui-form-flex')
  }
  return <>
    <div style={formStyle} className={className.join(' ')}>
      <div className='sui-form-body'>
        {
          _fields.sort((a, b) => a.sort > b.sort ? 1 : -1).map((item: any) => {
            return <Field {...item.field} key={item.key} columns={flex ? columns : undefined}>
              {resolveComponents(item)}
            </Field>
          })
        }
      </div>
    </div>
  </>
}