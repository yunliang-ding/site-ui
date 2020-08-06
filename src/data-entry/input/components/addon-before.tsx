import React from 'react'
export default (props: any) => {
  return <label className='sui-input-addon-before' titles={props.addon}>
    {props.addon}
  </label>
}