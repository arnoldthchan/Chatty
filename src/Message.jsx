import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Message extends Component {
  render() {
    // console.log("Rendering <Message/>")
    const messageStyle = {
      color: this.props.color
    }
    switch(this.props.type){
      case "incomingNotification":
        return(
          <div className="message system">
            <span className="message-content">{this.props.content}</span>
          </div>
        )
        break;

      case "incomingMessage":
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

      case "incomingImage":
        return(
          <div className="message" >
            <span className="message-username" style={messageStyle}>
              {this.props.username}
            </span>
            <span className="message-content">
              <img src={this.props.content} className="message-image" />
            </span>
          </div>
        )

      default:
        throw new Error("Unknown event type " + this.props.type);
    }
  }
}
export default Message;
