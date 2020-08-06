import React from 'react'
export default (props: any) => {
  return props.addon ? <label className='sui-input-addon-after' title={props.addon}>
    {props.addon}
  </label> : null
}