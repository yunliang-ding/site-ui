import React from 'react'
export default (props) => {
	return <input className='sui-input'
		type={props.type}
		value={props.value}
		placeholder={props.placeholder}
		onChange={
			(e) => {
				props.onChange && props.onChange(e)
			}
		}
		onBlur={
			(e) => {
				props.onBlur && props.onBlur(e)
			}
		}
		onFocus={
			(e) => {
				props.onFocus && props.onFocus(e)
			}
		}
	/>
}