import React from 'react'
import {NavLink } from 'react-router-dom'


const Contact = (props) => (

  <NavLink to={`${props.charURL}`} style={{color: '#fff'}} >
     <li className="contact">
    <div className="wrap">
      <span className="contact-status {props.status}"></span>
      <img src="{props.picURL}" alt="" />
      <div className="meta">
        <p className="name">{props.name}</p>
        <p className="preview">{props.message}</p>
      </div>
    </div>
  </li>
  </NavLink>
   
)

export default Contact