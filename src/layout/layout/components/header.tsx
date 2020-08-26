import React from 'react'
const Header = (props) => {
  return <header className='sui-layout-header'>
    {props.children}
  </header>
}
Header.nickName = 'Header'
export default Header