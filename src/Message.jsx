import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Message extends Component {
  render() {
    // console.log("Rendering <Message/>")
    switch(this.props.type){
      case "incomingNotification":
        return(
          <div className="message system">
            <span className="message-content">{this.props.content}</span>
          </div>
        )
        break;
      case "incomingMessage":
        let messageStyle = {
          color: this.props.color
        }
        return(
          <div className="message" >
            <span className="message-username" style={messageStyle}>
              {this.props.username}
            </span>
            <span className="message-content">
              {this.props.content}
            </span>
          </div>
        )
        break;
      default:
        throw new Error("Unknown event type " + this.props.type);
    }
  }
}
export default Message;
