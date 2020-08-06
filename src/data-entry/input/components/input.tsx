import React, { useState } from 'react'
import { Suffix, Prefix } from './index'
export default (props) => {
	const [value, setvalue] = useState(props.value)
	let style: any = {}
	props.prefix && (style.paddingLeft = 30)
	props.suffix && (style.paddingRight = 30)
	return <>
		{
			props.prefix && <Prefix>{props.prefix}</Prefix>
		}
		<input className={props.disabled ? 'sui-input-disabled' : 'sui-input'}
			type={props.type}
			style={style}
			placeholder={props.placeholder}
			value={value}
			readOnly={props.disabled}
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
		{
			props.suffix && <Suffix>{props.suffix}</Suffix>
		}
	</>
}