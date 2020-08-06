import React, { useState } from 'react'
export default (props: any) => {
	const [value, setvalue] = useState(props.value)
	return <textarea
		readOnly={props.disabled}
		className='sui-input-textarea'
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
	>
		{props.value}
	</textarea>
}