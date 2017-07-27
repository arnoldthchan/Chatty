import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    // console.log("Rendering <ChatBar/>")
    return (
      <footer className="chatbar" >
        <input className="chatbar-username" onBlur={this.props.postNotification} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.props.messageSend}/>
      </footer>
    );
  }
}
export default ChatBar;
