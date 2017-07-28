import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      color: "black",
      currentUser: {name: "Anonymous"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }
  //Handles for when messages are sent with enter
  messageSend = (event) =>{
    if(event.key === 'Enter' && event.target.value !== ""){
      const newMessage = {type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value,
        color: this.state.color
      };
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  }
  //Function that sends the message-list to the bottom/newest when called
  scrollToBot = () => {
     var messageList = document.getElementById('message-list');
     messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight;
  }
  //Handles username changes
  postNotification = (event) => {
    const name = this.state.currentUser.name
    const notification = {type: "postNotification"}
    if(event.target.value && event.target.value !== name){
      notification.content = `${name} has changed their name to ${event.target.value}.`
      this.setState({currentUser:{name: event.target.value}})
    } else if (!event.target.value && name !== "Anonymous"){
      notification.content = `${name} has changed their name to Anonymous.`
      this.setState({currentUser:{name: "Anonymous"}})
      }
    this.socket.send(JSON.stringify(notification))
    }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    this.socket.onopen = () => {
      console.log("Connected to server");
    }
    //Simulates an incoming welcome message with a timeout function
    setTimeout(() => {
      console.log("Simulating welcome message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: Date.now(),
        type: "incomingNotification",
        content: "Hey welcome to Chatty! Type some stuff"
      };
      let messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 800);

    this.socket.onmessage = (event) => {
      //Turns data back into an object and adds to messages
      const data = JSON.parse(event.data);
      const messages = this.state.messages.concat(data);
      //will add to messages if any type of incoming message
      switch(data.type) {
        case "incomingMessage":
        case "incomingImage":
        case "incomingNotification":
          // handle incoming messages, notifications, images
          this.setState({messages: messages});
          this.scrollToBot()
          break;
        case "userCountChanged":
          // handle username changes
          this.setState({userCount: data.userCount})
          break;
        case "colorAssign":
          // handle colour assignment for user
          this.setState({color: data.color});
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand" >Chatty</a>
        </nav>
        <div id="userCount"> {this.state.userCount} User(s) Online </div>
        <MessageList messages={this.state.messages} color={this.state.color}>
          <main className="messages"/>
        </MessageList>
        <ChatBar currentUser={this.state.currentUser} messageSend={this.messageSend} postNotification={this.postNotification} />
      </div>
    );
  }
}
export default App;