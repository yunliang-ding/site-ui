/**
 * 
| **属性名** | **类型**  | **描述**   | **默认**  |
| ---------- | --------- | ---------- | --------- |
| color      | ReastringctNode | 自定义小圆点的颜色 |  无  |
| count       | ReactNode    | 展示的数字       |  无   |
| dot       | boolean    | 不展示数字，只有一个小红点       |  false   |
| overflowCount  | number    | 展示封顶的数字值       |  99   |
| showZero       | boolean    | 当数值为 0 时，是否展示       |  false   |
| title       | string    | 设置鼠标放在状态点上时显示的文字       |  无   |
 */
import React from 'react'
import { Icon } from '../../index'
export default ({
  label = 'No Data',
  icon = 'iconempty'
}) => {
  return <div className='sui-empty-wrapper'>
    <Icon type={icon} />
    <span className='sui-empty-wrapper-label'>{label}</span>
  </div>
}