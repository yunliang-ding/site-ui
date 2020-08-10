import React, { useState, useEffect } from "react"
import { Select, Button, Input, Icon } from '../../index'
import dateUtil from './components/util'
export default ({
  value,
  onChange,
  placeholder,
  style
}: any) => {
  useEffect(()=>{
    let date = value || new Date().getTime()
    dateUtil.setDate(new Date(date)) // 更新时间
  }, [value])
  let yearList = dateUtil.getYearList() // 获取年列表
  let monthList = dateUtil.getMonthList()  // 获取月列表
  const [open, setopen] = useState(false)
  const [_value, setvalue] = useState(value)
  const [year, setyear] = useState(dateUtil.date.getFullYear())
  const [month, setmonth] = useState(dateUtil.date.getMonth() + 1)
  const [days, setdays] = useState(value)
  const [calendar, setcalendar] = useState(dateUtil.getCalendar())
  const renderHeader = () => {
    return ['日', '一', '二', '三', '四', '五', '六'].map(item => {
      return <div className='sui-picker-header-item' key={item}>
        {item}
      </div>
    })
  }
  const renderContent = () => {
    return calendar.map((row: any, index) => {
      return <div className='sui-picker-calendar-row' key={index}>
        {
          row.map(col => {
            return <div
              key={col.dateString}
              className={
                col.dateString === days ? 'sui-picker-calendar-row-col-active' :
                  col.current ? 'sui-picker-calendar-row-col-current' :
                    col.currentMonth ? 'sui-picker-calendar-row-col-current-month' : 'sui-picker-calendar-row-col'
              }
              onClick={setdays.bind(null, col.dateString)}
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
  const updateDateCalendar = (date) => { // 更新时间
    dateUtil.setDate(new Date(date))
    setcalendar(dateUtil.getCalendar())
    setyear(dateUtil.date.getFullYear())
    setmonth(dateUtil.date.getMonth() + 1)
  }
  return <>
    <div className='sui-date-picker' style={style}>
      <div className='sui-date-picker-input'>
        <Input
          placeholder={placeholder}
          value={_value}
          onFocus={setopen.bind(null, true)} />
      </div>
      {
        open && <>
          <div className='sui-date-picker-layer' onClick={setopen.bind(null,false)} />
          <div className='sui-date-picker-body'>
            <div className='sui-date-picker-body-tools'>
              <div title='上一年' className='picker-tools-before' onClick={
                () => {
                  updateDateCalendar(dateUtil.date.getTime() - (dateUtil.isLeapYear() ? 366 : 355) * 24 * 60 * 60 * 1000)
                }
              }>
                <Icon type='iconicon-jiantouzuo' />
              </div>
              <div title='上个月' className='picker-tools-before picker-tools-before-month' onClick={
                () => {
                  updateDateCalendar(dateUtil.date.getTime() - dateUtil.getDateNumberByMonth(dateUtil.date.getMonth() + 1) * 24 * 60 * 60 * 1000)
                }
              }>
                <Icon type='iconxiangzuoshouqi' />
              </div>
              <div className='picker-tools-date'>
                <Select
                  style={{ border: 0 }}
                  value={year}
                  options={yearList}
                  onChange={
                    (e) => {
                      updateDateCalendar(`${e}-${month}-${dateUtil.date.getDate()}`)
                    }
                  }
                />
                <Select
                  style={{ border: 0, width: 80 }}
                  value={month}
                  options={monthList}
                  onChange={
                    (e) => {
                      updateDateCalendar(`${year}-${e}-${dateUtil.date.getDate()}`)
                    }
                  }
                />
              </div>
              <div title='下个月' className='picker-tools-next picker-tools-next-month' onClick={
                () => {
                  updateDateCalendar(dateUtil.date.getTime() + dateUtil.getDateNumberByMonth(dateUtil.date.getMonth() + 1) * 24 * 60 * 60 * 1000)
                }
              }>
                <Icon type='iconzuocedakai' />
              </div>
              <div title='下一年' className='picker-tools-next' onClick={
                () => {
                  updateDateCalendar(dateUtil.date.getTime() + (dateUtil.isLeapYear() ? 366 : 355) * 24 * 60 * 60 * 1000)
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
                    setopen(false)
                    setvalue(days)
                    typeof onChange === 'function' && onChange(days)
                  }
                }
              >
                确定
              </Button>
            </div>
          </div>
        </>
      }
    </div>
  </>
}
