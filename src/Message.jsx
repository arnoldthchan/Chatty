import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Message extends Component {
  render() {
    console.log("Rendering <Message/>")
    return (
      <div className="message">
        <span className="message-username">Anonymous1</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
        <div className="message system">Anonymous1 changed their name to nomnom.</div>
      </div>
    );
  }
}
export default Message;
