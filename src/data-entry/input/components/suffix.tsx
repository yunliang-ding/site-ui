import React from 'react'
export default (props: any) => {
  return <div className='sui-input-suffix' style={props.style}>
    {props.children}
  </div>
}