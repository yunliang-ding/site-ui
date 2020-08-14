/**
 * 
| **属性名** | **类型**  | **描述**   | **默认**  |
| ----------- | -------------------- | -------------- | -------- |
| style       | object               | 样式           | 无       |
| pages       | ReactNode[]          | 每一页的结构   | 无       |
| effect      | string               | 模式：fade     | 无       |
| currentPage | number               | 当前页码       | 1        |
| onChange    | funcito(currentPage) | 页码改变的回调 | 无       |
| autoPlay    | boolean              | 自动播放       | false    |
| showArrow   | boolean              | 展示箭头       | false    |
 */
import React, { useState, useEffect } from "react"
import { Icon } from '../../index'
export default ({
  style = {},
  pages = [],
  effect,
  currentPage = 1,
  onChange,
  autoPlay = false,
  showArrow = false
}) => {
  let timer: any;
  const [_currentPage, setcurrentPage] = useState(currentPage)
  const updateCurrentPage = (page: number) => {
    clearTimeout(timer) // clear
    let currentPage = 1
    if (page < 1) {
      currentPage = pages.length
    } else if (page > pages.length) {
      currentPage = 1
    } else {
      currentPage = page
    }
    setcurrentPage(currentPage)
    typeof onChange === 'function' && onChange(currentPage)

  }
  const Play = () => {
    timer = setTimeout(() => {
      updateCurrentPage( _currentPage + 1 > pages.length ? 1 : _currentPage + 1)
    }, 3000)
  }
  useEffect(() => {
    autoPlay && Play()
  }, [_currentPage])
  return <>
    <div className={`sui-carousel`} style={style}>
      {
        showArrow && <>
          <div className='sui-carousel-before' onClick={
            () => {
              updateCurrentPage(_currentPage - 1)
            }
          }>
            <Icon type='iconicon-jiantouzuo' />
          </div>
          <div className='sui-carousel-next' onClick={
            () => {
              updateCurrentPage(_currentPage + 1)
            }
          }>
            <Icon type='iconjiantou2' />
          </div>
        </>
      }
      {
        pages.map((page, index) => {
          return <div key={index} className='sui-carousel-page' style={{
            left: effect === 'fade' ? 0 : (index + 1) === _currentPage ? 0 : 100 * ((index + 1) - _currentPage) + '%',
            opacity: effect === 'fade' ? ((index + 1) === _currentPage ? 1 : 0) : 1,
            transition: effect === 'fade' ? '.8s' : '.5s'
          }}>
            {
              page
            }
          </div>
        })
      }
      <div className='sui-carousel-legend'>
        <div className='sui-carousel-legend-box'>
          {
            pages.map((page, index) => {
              return <div
                key={index}
                className={(index + 1) === _currentPage ? 'sui-carousel-legend-box-item-active' : 'sui-carousel-legend-box-item'}
                onClick={
                  () => {
                    updateCurrentPage(index + 1)
                  }
                }
              />
            })
          }
        </div>
      </div>
    </div>
  </>
}