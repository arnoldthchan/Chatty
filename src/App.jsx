import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.enterPress = this.enterPress.bind(this);
    this.state =
      {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 2,
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      };
  }

  enterPress(event) {
    if(event.key === 'Enter' && event.target.value !== ""){
      const newMessage = {id: Date.now(), username: this.state.currentUser.name, content: event.target.value};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
      event.target.value = "";
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 1500);
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
        <ChatBar currentUser={currentUser} enterPress={this.enterPress}/>
      </div>
    );
  }
}
export default App;


