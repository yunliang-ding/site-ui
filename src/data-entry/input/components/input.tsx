import React, { useState } from 'react'
export default (props) => {
	const [value, setvalue] = useState(props.value)
	return <input className='sui-input'
		type={props.type}
		placeholder={props.placeholder}
		value={value}
		onChange={
			(e) => {
				setvalue(e.target.value)
				typeof props.onChange === 'function' && props.onChange(e)
			}
		}
		onBlur={
			(e) => {
				typeof props.onBlur === 'function' && props.onBlur(e)
			}
		}
		onFocus={
			(e) => {
				typeof props.onFocus === 'function' && props.onFocus(e)
			}
		}
		onKeyDown={
			(e) => {
				if (e.keyCode === 13) {
					typeof props.onPressEnter === 'function' && props.onPressEnter(e)
				}
			}
		}
	/>
}