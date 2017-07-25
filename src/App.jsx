import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand" >Chatty</a>
        </nav>
        <MessageList />
        <main className="messages"/>
        <ChatBar />
      </div>
    );
  }
}
export default App;


