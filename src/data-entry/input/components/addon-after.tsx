import React from 'react'
export default (props: any) => {
  return <label className='sui-input-addon-after' title={props.addon}>
    {props.addon}
  </label>
}