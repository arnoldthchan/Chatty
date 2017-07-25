import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      };
  }
  render() {
    const currentUser = this.state.currentUser
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand" >Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}>
          <div className="message system">Anonymous1 changed their name to nomnom.</div>
        </MessageList>
        <main className="messages"/>
        <ChatBar currentUser={currentUser} />
      </div>
    );
  }
}
export default App;


