import React from 'react'
export default (props:any) => {
  return <textarea
    readOnly={props.disabled}
    className='sui-input-textarea'
    value={props.value}
    onChange={
      (e) => {
        props.onChange && props.onChange(e)
      }
    }
  >
    {props.value}
  </textarea>
}