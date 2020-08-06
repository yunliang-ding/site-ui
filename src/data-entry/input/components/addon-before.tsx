import React from 'react'
export default (props: any) => {
  return props.addon ? <label className='sui-input-addon-before' titles={props.addon}>
    {props.addon}
  </label> : null
}