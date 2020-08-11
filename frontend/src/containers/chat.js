import React, { Component } from 'react'
import SidePanal from './SidePanal/SidePanal'
import WebSocketInstance from '../websocket'
import { connect } from 'react-redux';

class Chat extends Component {

  state = {message : ''}

  webconnect() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this) )
      WebSocketInstance.fetchMessages(this.props.username, this.props.match.params.chatID );

    })

    WebSocketInstance.connect(this.props.match.params.chatID)
  }
  
  constructor(props) {
    super(props);
    this.webconnect()

   
  }

  



  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(
        function() {
            if(WebSocketInstance.state() === 1) {
                console.log("Connection is secure");
                    callback()
                    return;

            } else {
                console.log("wating for connection");
                component.waitForSocketConnection(callback)
            }
        }, 100)
}

      addMessage(message) {
        this.setState({
          messages: [...this.state.messages, message]
        })
      }

      setMessages(messages) {
        this.setState({
          messages: messages.reverse()
        })
      }


      // renderTime = (timestamp) => {
      // let prefix = '';
      // const timediff = Math.round((new Date().getTime() - new Date(message.timetemp).getTime()) / 60000)} mins ago
      // if (timediff < 60 && timediff > 1) {
      // prefix = `${timediff} min ago`
      //}
      //}

      renderMessages = (messages) => {
        const username  = this.props.username
        return messages.map(message => (
          <li key={messages.id} className={message.author === username  ? 'sent': 'replies'}>
            <img src="http://emilcarlsson.se/assets/mikeross.png" />
            <p>
              {message.content}
            </p>
            <br />
            <small>
              {Math.round((new Date().getTime() - new Date(message.timetemp).getTime()) / 60000)} mins ago
            </small>
          </li>
        ))
      }


      messageHandler = (event) => {
        this.setState({
          message : event.target.value
        })
      }

      sendMessageHandler = e => {
        e.preventDefault();
        const messageObject = {
          from : this.props.username,
          content : this.state.message,
          chatId : this.props.match.params.chatID
        }

        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
          message: ''
        })
        
      }


      scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      
      componentDidMount() {
        this.scrollToBottom();
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }

      componentWillReceiveProps(newProps) {
        if (this.props.match.params.chatID !== newProps.match.params.chatID) {
          WebSocketInstance.disconnect();
          this.waitForSocketConnection(() => {
            WebSocketInstance.fetchMessages(this.props.username, newProps.match.params.chatID );
      
          })
      
          WebSocketInstance.connect(newProps.match.params.chatID)
        }
      }



      componentDidMount() {
        WebSocketInstance.connect();
    }



    render() {
      console.log(this.props.username)
      const messages = this.state.messages;
        return (
            <div id="frame">
            
           
           
              <div className="messages">
                <ul id="chat-log">

                  {messages && this.renderMessages(messages)
                  }
                  <div style={{ float:"left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
                  </div>
                 
                </ul>
              </div>
              <div className="message-input">
                <form onSubmit={this.sendMessageHandler}>
                   <div className="wrap">
                <input
                 onChange={this.messageHandler}
                 value={this.state.message}
                 id="chat-message-input"
                  type="text"
                   placeholder="Write your message..." />
                <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                <button id="chat-message-submit" className="submit">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
                </div>
                </form>
               
              </div>
            </div>
          
        )
    }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username
  }
}


export default connect(mapStateToProps, null)(Chat);