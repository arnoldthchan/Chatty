import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>")
    const listMessages = this.props.messages.map((message) =>
      <Message username={message.username} content={message.content} key={message.id}/>
    );
    return (
      <div id="message-list">
        {listMessages}
      </div>
    );
  }
}
export default MessageList;
