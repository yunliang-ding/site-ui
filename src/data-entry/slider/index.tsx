import React, { useState, useEffect, useRef } from 'react'
import { Tooltip } from '../../index'
/**
| **属性名**   | **类型**             | **描述**     | **默认**   |
| ------------    | -------------------- | ------------ | ---------- |
| value           | number   | 值         | 0            |
| disabled        | boolean  | 是否禁用    | false           |
| tooltipVisible  ｜ boolean ｜ 是否显示进度 ｜ false
| onChange        ｜ function(value) | 改变后的回调 ｜ 无 ｜ 
| min             ｜ number          ｜ 开始区间  ｜ 0         ｜
| max             ｜ number          ｜ 结束区间  ｜ 100        ｜
| style           ｜ object          ｜ 滑块样式  ｜          ｜
 */
export default ({
  value,
  min = 0,
  max = 100,
  disabled = false,
  onChange,
  style,
  tooltipVisible = null
}) => {
  const noop = () => { }
  useEffect(() => {
    if (value < min) {
      setvalue(min)
    } else if (value > max) {
      setvalue(max)
    } else {
      setvalue(value)
    }
  }, [value])
  const [_value, setvalue] = useState(value)
  const [status, setstatus] = useState(false)
  const [position, setposition] = useState({})
  const [coefficient, setCoefficient] = useState(1) // 系数 1px对应的value
  const sliderRailRef = useRef()
  const sliderHandleRef = useRef()
  useEffect(() => {
    setposition(sliderHandleRef.current.getBoundingClientRect())
    setCoefficient(Number(100 / (sliderRailRef.current.getBoundingClientRect().width || style && style.width)).toFixed(2))
  }, [_value])
  return <>
    <div ref={sliderRailRef} className={disabled ? 'sui-slider sui-slider-disabled' : 'sui-slider'} style={style} onClick={
      ({ pageX }) => {
        if (disabled) return
        const { x } = sliderHandleRef.current.getBoundingClientRect()
        let __value: any = Number(_value) + Number((pageX - x) * coefficient)
        if (__value >= min && __value <= max) {
          setvalue(parseInt(__value))
          let number: any = Math.round(__value)
          typeof onChange === 'function' && onChange(parseInt(number))
        }
      }
    }>
      <div className='sui-slider-rail' />
      <div className='sui-slider-track' style={{ left: '0%', right: 'auto', width: _value + '%' }} />
      <div className='sui-slider-step' />
      {
        tooltipVisible === null ? <div
          className='sui-slider-handle'
          ref={sliderHandleRef}
          style={{ left: _value + '%', right: 'auto', transform: 'translateX(-50%)' }}
          onMouseDown={disabled ? noop : setstatus.bind(null, true)}
        /> : <Tooltip title={_value} visible={tooltipVisible} theme='dark'>
            <div
              className='sui-slider-handle'
              ref={sliderHandleRef}
              style={{ left: _value + '%', right: 'auto', transform: 'translateX(-50%)' }}
              onMouseDown={disabled ? noop : setstatus.bind(null, true)}
            />
          </Tooltip>
      }
      {
        status && <div
          className='sui-slider-mark'
          onMouseUp={
            () => {
              if (disabled) return
              setstatus(false)
              let number: any = Math.round(_value)
              typeof onChange === 'function' && onChange(parseInt(number))
            }
          }
          onMouseMove={
            ({ pageX }) => {
              if (disabled) return
              if (status) {
                let __value: any = Number(_value) + Number((pageX - position.x) * coefficient)
                if (__value >= min && __value <= max) {
                  setvalue(parseInt(__value))
                }
              }
            }
          }
        />
      }
    </div>
  </>
}