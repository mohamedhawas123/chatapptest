import React, { Component } from 'react'
import * as action from '../../store/actions/auth'
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import Contact from '../../components/Contact'
import axios from 'axios'
import * as navaction from '../../store/actions/nav'




class SidePanal extends Component {



  state = {
    LoginForm : true,
    chats : []

  }

  componentDidUpdate() {
    if(this.props.token !== null && this.props.username !==null) {
      this.getUserchat(this.props.token, this.props.username)

    }
  }
  
  openChatpopup() {
    this.props.addChat()
  }

  getUserchat = (token, username) => {
    axios.defaults.headers = {
      "Content-Type" : "application/json",
      Authorization: `Token ${token}`
    }
    axios.get(`http://127.0.0.1:8000/chat/?username=${username}`)
    .then(res => {
      console.log(res.data)
      this.setState({chats: res.data})
    })
  }

  checkForm = () => {
    this.setState({LoginForm : !this.state.LoginForm});
  }

  authenticate = (e) => {
    e.preventDefault()
    if(this.state.LoginForm) {
      this.props.login(
        e.target.username.value,
        e.target.password.value
      )
    } else {
      this.props.signup(
        e.target.username.value,
        e.target.email.value,
        e.target.password1.value,
        e.target.password2.value

      )
    }

  }








    render() {
        const activeChat = this.state.chats.map(c => {
          return (
            <Contact key={c.id} name="saif"
            status="online"
            picURL="http://emilcarlsson.se/assets/louislitt.png"
            charURL= {`/${c.id}`}
            message= "hey brooooooooo"
             />
          )
        })
        return (
            <div id="sidepanel">
            <div id="profile">
              <div className="wrap">
                <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                <p>Mike Ross</p>
                <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                <div id="status-options">
                  <ul>
                    <li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
                    <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                    <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                    <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
                  </ul>



                <div id="expandad" >
           


                </div>







                </div>
                <div id="expanded">
                  <label htmlFor="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
                  <input name="twitter" type="text"  />
                  <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
                  <input name="twitter" type="text" />
                  <label htmlFor="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
                  <input name="twitter" type="text"  />
                </div>
              </div>
            </div>



            {
                    

                    this.props.isAthuenticated ? <button style={{ color: 'green' }} onClick={() => this.props.logout()} className="authBtn">Logout</button> :
                    <div>
                      <form method="POST" onSubmit={this.authenticate}>
                        {this.state.LoginForm ?
                        <div>
                          <input type="username" name="username" placeholder="username" />
                          <input type="password" name="password" placeholder="password" />
                        </div> :

                        <div>
                          <input type="username" name="username" placeholder="username" />
                          <input type="email" name="email" placeholder="email" />
                          <input type="password" name="password1" placeholder="password" />
                          <input type="password" name="password2" placeholder="passowrd" />
                        </div>

                        }
                        <button style={{ color: 'blue' }} type="submit" >Go</button>
                      </form>
                      <button style={{ color: 'red' }} onClick={this.checkForm}>Switch</button>
                    </div>
                  }




            <div id="search">
              <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
              <input type="text" placeholder="Search contacts..." />
            </div>
            <div id="contacts">
              <ul>
                  {activeChat}
         
              </ul>
            </div>
            <div id="bottom-bar">
              <button onClick={() => this.openChatpopup()}  id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add Chat</span></button>
              <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAthuenticated : state.auth.token !== null,
    token : state.auth.token,
    username: state.auth.username
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    login : (username, passsword) => dispatch(action.authLogin(username, passsword)),
    logout: () => dispatch(action.logout()),
    signup: (username, email, password1, password2) => dispatch(action.authSignup(username, email, password1, password2)),
    addChat : () => dispatch(navaction.openAddChat())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanal);