import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>")
    return (
      <footer className="chatbar" >
        <input className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.props.enterPress} />
      </footer>
    );
  }
}
export default ChatBar;
