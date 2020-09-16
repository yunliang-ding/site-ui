/**
 * 
| **属性名** | **类型**  | **描述**   | **默认**  |
| ---------- | --------- | ---------- | --------- |
| color      | ReastringctNode | 自定义小圆点的颜色 |  无  |
| count       | ReactNode    | 展示的数字       |  无   |
| dot       | boolean    | 不展示数字，只有一个小红点       |  false   |
| title       | string    | 设置鼠标放在状态点上时显示的文字       |  无   |
 */
import React from 'react'
export default ({
  color,
  count,
  dot=false,
  title,
  children
}:any) => {
  let style:any = {}
  if(color){
    style.backgroundColor = color
  }
  return <span className='sui-badge-wrapper'>
    {
      children
    }
    {
      dot ? <sup className='sui-badge-dot' style={style} /> : <sup style={style} className='sui-badge-count' title={title}>
        {count}
      </sup>
    }
  </span>
}