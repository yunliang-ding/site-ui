import React, { useState, useEffect } from "react"
import { Select, Button, Input, Icon } from '../../index'
import { DateUtil } from './components/util'
export default ({
  value,
  onChange,
  placeholder,
  format = 'YYYY-MM-DD',
  style
}: any) => {
  let date = value || new Date().getTime()
  let dateUtil = new DateUtil(new Date(date), format)
  let yearList = dateUtil.getYearList()
  let monthList = dateUtil.getMonthList()
  const [open, setopen] = useState(false)
  const [_value, setvalue] = useState()
  const [calendar, setcalendar] = useState()
  useEffect(() => {
    setvalue(value)
    let date = value || new Date().getTime()
    dateUtil = new DateUtil(new Date(date), format)
    setcalendar(dateUtil.getCalendar()) // 当前日历
  }, [value, format])
  const renderHeader = () => {
    return ['日', '一', '二', '三', '四', '五', '六'].map(item => {
      return <div className='sui-picker-header-item'>
        {item}
      </div>
    })
  }
  const renderContent = () => {
    return calendar.map((row: any) => {
      return <div className='sui-picker-calendar-row'>
        {
          row.map(col => {
            return <div
              className={
                col.dateString === _value ? 'sui-picker-calendar-row-col-active' :
                  col.current ? 'sui-picker-calendar-row-col-current' :
                    col.currentMonth ? 'sui-picker-calendar-row-col-current-month' : 'sui-picker-calendar-row-col'
              }
              onClick={
                () => {
                  setvalue(col.dateString)
                  setopen(false)
                  if (typeof onChange === 'function') {
                    onChange(col.dateString)
                  }
                }
              }
            >
              <div className='sui-picker-calendar-inner'>
                {col.date}
              </div>
            </div>
          })
        }
      </div>
    })
  }
  const setCalendar = (time) => {
    dateUtil.setDate(new Date(time))
    setcalendar(dateUtil.getCalendar())
  }
  return <>
    <div className='sui-date-picker' style={style}>
      <div className='sui-date-picker-input'>
        <Input
          placeholder={placeholder}
          value={_value}
          onFocus={
            () => {
              dateUtil.setDate(new Date(_value ? _value : new Date()))
              setopen(true)
              setcalendar(dateUtil.getCalendar())
            }
          } />
      </div>
      {
        open && <>
          <div className='sui-date-picker-layer' onClick={setopen.bind(false)} />
          <div className='sui-date-picker-body'>
            <div className='sui-date-picker-body-tools'>
              <div className='picker-tools-before' onClick={
                () => {
                  setCalendar(dateUtil.date.getTime() - (dateUtil.isLeapYear() ? 366 : 355) * 24 * 60 * 60 * 1000)
                }
              }>
                <Icon type='iconicon-jiantouzuo' />
              </div>
              <div className='picker-tools-before picker-tools-before-month' onClick={
                () => {
                  setCalendar(dateUtil.date.getTime() - dateUtil.getDateNumberByMonth(dateUtil.date.getMonth() + 1) * 24 * 60 * 60 * 1000)
                }
              }>
                <Icon type='iconxiangzuoshouqi' />
              </div>
              <div className='picker-tools-date'>
                <Select
                  style={{ border: 0 }}
                  value={dateUtil.date.getFullYear()}
                  options={yearList}
                  onChange={
                    (e) => {
                      dateUtil.setDate(
                        new Date(`${e}-${dateUtil.date.getMonth() + 1}-${dateUtil.date.getDate()}`)
                      )
                      setcalendar(dateUtil.getCalendar())
                    }
                  }
                />
                年
                <Select
                  style={{ border: 0 }}
                  value={dateUtil.date.getMonth() + 1}
                  options={monthList}
                  onChange={
                    (e) => {
                      dateUtil.setDate(
                        new Date(`${dateUtil.date.getFullYear()}-${e}-${dateUtil.date.getDate()}`)
                      )
                      setcalendar(dateUtil.getCalendar())
                    }
                  }
                />
                月
              </div>
              <div className='picker-tools-next picker-tools-next-month' onClick={
                () => {
                  setCalendar(dateUtil.date.getTime() + dateUtil.getDateNumberByMonth(dateUtil.date.getMonth() + 1) * 24 * 60 * 60 * 1000)
                }
              }>
                <Icon type='iconzuocedakai' />
              </div>
              <div className='picker-tools-next' onClick={
                () => {
                  setCalendar(dateUtil.date.getTime() + (dateUtil.isLeapYear() ? 366 : 355) * 24 * 60 * 60 * 1000)
                }
              }>
                <Icon type='iconjiantou2' />
              </div>
            </div>
            <div className='sui-date-picker-body-header'>
              {renderHeader()}
            </div>
            <div className='sui-date-picker-body-calendar'>
              {renderContent()}
            </div>
            <div className='sui-date-picker-body-footer'>
              <Button
                type='primary'
                style={{ height: 30, width: 60 }}
                onClick={
                  () => {
                    dateUtil.setDate(new Date())
                    setvalue(dateUtil.getDateString(new Date()))
                    setopen(false)
                  }
                }
              >
                今天
              </Button>
            </div>
          </div>
        </>
      }
    </div>
  </>
}
