import React, { useState } from 'react'
import { Suffix, Prefix } from './index'
import { Icon } from '../../../index'
export default (props) => {
	const [value, setvalue] = useState(props.value || '')
	let style: any = {}
	props.prefix && (style.paddingLeft = 30)
	props.suffix && (style.paddingRight = 30)
	props.addonBefore && (style.borderTopLeftRadius = 0, style.borderBottomLeftRadius = 0)
	props.addonAfter && (style.borderTopRightRadius = 0, style.borderBottomRightRadius = 0)
	return <>
		{
			props.prefix && <Prefix>{props.prefix}</Prefix>
		}
		<input
			type='text'
			style={style}
			className={props.disabled ? 'sui-input-disabled' : 'sui-input'}
			placeholder={props.placeholder}
			value={value}
			maxLength={props.maxLength}
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
			props.allowClear && value !== '' ? <Suffix>
				<Icon type='iconcuo' onClick={
					() => {
						setvalue('')
					}
				} />
			</Suffix> : props.suffix && <Suffix>{props.suffix}</Suffix>
		}
	</>
}