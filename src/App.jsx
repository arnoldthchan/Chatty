import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    // this.enterPress = this.enterPress.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }

  enterPress = (event) =>{
    if(event.key === 'Enter' && event.target.value !== ""){
      console.log(event);
      const newMessage = {id: Date.now(), username: this.state.currentUser.name, content: event.target.value};
      // const messages = this.state.messages.concat(newMessage);
      // this.setState({messages: messages});
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  }
  nameChange = (event) => {
    if (event.target.value){
      this.setState({currentUser:{name: event.target.value}})
      console.log(this.state.name)
    } else{
      this.setState({currentUser:{name: "Anonymous"}})
    }
  }
  componentDidMount() {
    // console.log("componentDidMount <App />");

    this.socket.onopen = () => {
      console.log("Connected to server");
    }

    this.socket.onmessage = (event) => {
      const serMessage = JSON.parse(event.data);
      // console.log('OnMessage from server:', serMessage);
      const messages = this.state.messages.concat(serMessage);
      this.setState({messages: messages});
      // this.state.messages.push(serMessage);
    }

    //Simulates an incoming message with a timeout function
    // setTimeout(() => {
    //   console.log("Simulating incoming message");

    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages});
    // }, 1500);

  }

  render() {
    // console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand" >Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}>
          <div className="message system">Anonymous1 changed their name to nomnom.</div>
        </MessageList>
        <main className="messages"/>
        <ChatBar currentUser={this.state.currentUser} enterPress={this.enterPress} nameChange={this.nameChange}/>
      </div>
    );
  }
}
export default App;
