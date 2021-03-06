import React from 'react'
import ReactDOM from "react-dom"
import { Icon } from '../../index'
const $: any = document.querySelector.bind(document)
const $$: any = document.querySelectorAll.bind(document)
const typeMapping = {
  1: 'suiconmessage_SendSuccessfully',
  2: 'suiconcuo',
  3: 'suiconinfo_warning',
  4: 'suiconwarning'
}
const colorMapping = {
  1: '#1ac7aa',
  2: '#d81e06',
  3: '#f4ea2a',
  4: '#39a9f4'
}
export default class Message {
  duration: any
  dark: any
  position:string
  constructor(props) {
    this.duration = props.duration || 3
    this.position = props.position || 'center'
  }
  open = (type, content) => {
    let messageContainer = document.createElement("div");
    let length = $$('.sui-message').length
    messageContainer.className = 'sui-message'
    if(this.position === 'br'){
      messageContainer.style.left = 'auto'
      messageContainer.style.top = 'auto'
      messageContainer.style.bottom = 50 + length * 60 + 'px'
      messageContainer.style.right = '20px'
    } else {
      messageContainer.style.top = 50 + length * 60 + 'px'
      messageContainer.style.top = 50 + length * 60 + 'px'
    }
    $('body').appendChild(messageContainer)
    setTimeout(() => {
      messageContainer.remove()
    }, this.duration * 1000)
    ReactDOM.render(this.renderMessage(type, content), messageContainer)
  }
  close = (node) => {
    node.target.parentNode.parentNode.parentNode.remove()
  }
  success = (content) => {
    this.open(1, content)
  }
  error = (content) => {
    this.open(2, content)
  }
  warning = (content) => {
    this.open(3, content)
  }
  normal = (content) => {
    this.open(4, content)
  }
  renderMessage = (type, content) => {
    return <div className='sui-message-content'>
      <div className='sui-message-content-icon'>
      <Icon type={typeMapping[type]} color={colorMapping[type]} />
      </div>
      <div className='sui-message-content-message'>{content}</div>
      <div className='sui-message-content-close'>
        <Icon type='suiconguanbi' onClick={
          (e) => {
            this.close(e)
          }
        } />
      </div>
    </div>
  }
}