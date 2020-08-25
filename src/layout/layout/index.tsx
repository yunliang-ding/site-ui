import React from 'react'
import { Header, Sider, Content, Footer } from './components'
const Layout = (props:any) => {
  return <>
    <section className='sui-layout'>
      {props.children}
    </section>
  </>
}
Layout.Header = Header
Layout.Sider = Sider
Layout.Content = Content
Layout.Footer = Footer
export default Layout