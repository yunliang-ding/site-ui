import React from 'react'
import { AddonBefore, AddonAfter, TextArea, Input } from './components'
/**
  addonAfter:any,
  addonBefore:any,
  defaultValue:string,		
  disabled:boolean,	
  maxLength:Number,		
  prefix:any		
  suffix:any,	
  value:string,	
  onChange:any,
  onPressEnter:any,		
  allowClear:boolean,
  type:string
*/
export default (props: any) => {
  return <div className='sui-wapper-input'>
    <AddonBefore addon={props.addonBefore} />
    {
      props.type === 'textarea' ?  <TextArea {...props} /> :  <Input {...props} />
    }
    <AddonAfter addon={props.addonAfter} />
  </div>
}