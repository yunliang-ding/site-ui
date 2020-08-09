import React, { useState } from 'react'
export default (props: any) => {
	const [value, setvalue] = useState(props.value)
	let style: any = props.stype || {}
	props.addonBefore && (style.borderTopLeftRadius = 0, style.borderTopRightRadius = 0)
	props.addonAfter && (style.borderBottomLeftRadius = 0, style.borderBottomRightRadius = 0)
	return <textarea
		readOnly={props.disabled}
		className={props.disabled ? 'sui-textarea-disabled' : 'sui-textarea'}
		placeholder={props.placeholder}
		value={value}
		style={style}
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