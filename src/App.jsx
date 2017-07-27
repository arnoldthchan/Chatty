import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      currentUser: {name: "Anonymous1"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    // this.messageSend = this.messageSend.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }

  messageSend = (event) =>{
    if(event.key === 'Enter' && event.target.value !== ""){
      const newMessage = {type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value
      };
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  }

  postNotification = (event) => {
    if(event.target.value !== ""){
      const name = this.state.currentUser.name
      const notification = {
        type: "postNotification",
        content: `${name} has changed their name to ${event.target.value}.`,
      }
      this.setState({currentUser:{name: event.target.value}})
      this.socket.send(JSON.stringify(notification))
    }
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    this.socket.onopen = () => {
      console.log("Connected to server");
    }

    //Simulates an incoming message with a timeout function
    setTimeout(() => {
      console.log("Simulating welcome message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: Date.now(),
        type: "incomingMessage",
        username: "ChattyBot",
        content: "Hey welcome to Chatty! Type some stuff"
      };
      let messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 1000);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messages = this.state.messages.concat(data);
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      switch(data.type) {
        case "incomingMessage":
          this.setState({messages: messages});
          // handle incoming message
          break;
        case "incomingNotification":
          this.setState({messages: messages})
          // handle incoming notification
          break;
        case "userCountChanged":
          console.log(`NEW USER COUNT: ${data.userCount}`)
          this.setState({userCount: data.userCount})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    // console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand" >Chatty</a>
          <div id="userCount"> {this.state.userCount} Users Online </div>
        </nav>
        <MessageList messages={this.state.messages}>
          <main className="messages"/>
        </MessageList>
        <ChatBar currentUser={this.state.currentUser} messageSend={this.messageSend} postNotification={this.postNotification} />
      </div>
    );
  }
}
export default App;
