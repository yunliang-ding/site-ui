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
| legend      | boolean              | 是否展示          | true    |
| loop        | boolean              | 是否循环轮播          | true    |
| swipe       | boolean              | 是否开启滑动          | true    |
 */
import React, { useState, useEffect, useRef } from "react"
import { Icon } from '../../index'
export default ({
  style = {},
  pages = [],
  effect,
  currentPage = 1,
  onChange,
  autoPlay = false,
  showArrow = false,
  legend = true,
  loop = true,
  swipe = true
}:any) => {
  let timer: any;
  /** update */
  useEffect(() => {
    setcurrentPage(currentPage)
  }, [currentPage])
  const [_currentPage, setcurrentPage] = useState(currentPage)
  const updateCurrentPage = (page: number) => {
    clearTimeout(timer) // clear
    let currentPage = 1
    page = page % pages.length
    if (page < 1) {
      currentPage = loop ? pages.length : 1
    } else if (page > pages.length) {
      currentPage = loop ? 1 : pages.length
    } else {
      currentPage = page
    }
    setcurrentPage(currentPage)
    typeof onChange === 'function' && onChange(currentPage)
  }
  const Play = () => {
    timer = setTimeout(() => {
      updateCurrentPage(_currentPage + 1 > pages.length ? 1 : _currentPage + 1)
    }, 3000)
  }
  useEffect(() => {
    autoPlay && Play()
  }, [_currentPage])
  /**
   * H5左右滑动触发
   */
  const carouselRef = useRef()
  let swipeX = true;
  let swipeY = true;
  let position = {
    x:0,
    y:0,
    x1:0,
    y1:0
  }
  useEffect(() => {
    if(carouselRef && carouselRef.current && swipe){
      let page = _currentPage // 记录
      carouselRef.current.addEventListener('touchstart', (event) => {
        position.x = event.changedTouches[0].pageX;
        position.y = event.changedTouches[0].pageY;
        swipeX = true;
        swipeY = true;
      })
      carouselRef.current.addEventListener('touchmove', (event) => {
        position.x1 = event.changedTouches[0].pageX;
        position.y1 = event.changedTouches[0].pageY;
        // 左右滑动
        if (swipeX && Math.abs(position.x1 - position.x) - Math.abs(position.y1 - position.y) > 0) {
          // 阻止事件冒泡
          event.stopPropagation();
          if (position.x1 - position.x > 10) {   // 左滑
            page = page - 1
            updateCurrentPage(page)
            event.preventDefault();
            swipeX = false;
          }
          if (position.x - position.x1 > 10) {   // 右滑
            page = page + 1
            updateCurrentPage(page)
            event.preventDefault();
            swipeX = false;
          }
        }
        // 上下滑动
        if (swipeY && Math.abs(position.x1 - position.x) - Math.abs(position.y1 - position.y) < 0) {
          swipeX = false;
        }
      })
    }
  }, [])
  return <>
    <div className={`sui-carousel`} style={style} ref={carouselRef}>
      {
        showArrow && <>
          <div className='sui-carousel-before' onClick={
            () => {
              updateCurrentPage(_currentPage - 1)
            }
          }>
            <Icon type='suiconicon-jiantouzuo' />
          </div>
          <div className='sui-carousel-next' onClick={
            () => {
              updateCurrentPage(_currentPage + 1)
            }
          }>
            <Icon type='suiconjiantou2' />
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
      {
        legend && <div className='sui-carousel-legend'>
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
      }
    </div>
  </>
}