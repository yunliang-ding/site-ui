import React from 'react'
const Content = (props) => {
  return <main className='sui-layout-content'>
    {props.children}
  </main>
}
Content.nickName = 'Content'
export default Content