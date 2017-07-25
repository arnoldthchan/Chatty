import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>")
    return (
      <div id="message-list">
        <Message />
      </div>
    );
  }
}
export default MessageList;
