import React from 'react'
import { Header, Sider, Content, Footer } from './components'
const Layout = (props:any) => {
  let hasSider = props.children.some(item => item.type.name === 'Sider')
  let hasHeader = props.children.some(item => item.type.name === 'Header')
  let hasFooter = props.children.some(item => item.type.name === 'Footer')
  const wrapperClassName = ['sui-layout']
  if(hasSider){
    wrapperClassName.push('sui-layout-has-sider')
  }
  if(hasHeader && hasFooter){
    wrapperClassName.push('sui-layout-has-header-footer')
  } else {
    if(hasHeader){
      wrapperClassName.push('sui-layout-has-header')
    }
    if(hasFooter){
      wrapperClassName.push('sui-layout-has-footer')
    }
  }
  return <>
    <section className={wrapperClassName.join(' ')}>
      {props.children}
    </section>
  </>
}
Layout.Header = Header
Layout.Sider = Sider
Layout.Content = Content
Layout.Footer = Footer
export default Layout