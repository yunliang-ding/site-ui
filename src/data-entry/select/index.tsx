import React from 'react'
import { Select, SelectMultiple } from './components'
export default (props:any) => {
  return props.mode === 'multiple' ? <SelectMultiple {...props} /> : <Select {...props} /> 
}