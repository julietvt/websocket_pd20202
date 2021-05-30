//import './App.css';
import React, { Component } from 'react';
import { emitTest, emitMessage } from './api/ws/api.js';
import socket from './api/ws';
import styles from './App.css';
import MessagesList from './components/MessagesList';
import UserList from './components/UserList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: new Map(),
      currentUser: '',
      message: '',
    };
  }
  componentDidMount() {}

  selectUser = (user) => {
    this.setState({ currentUser: user });
  };

  addUser = (id) => {
    this.state.users.set(id, []);
    this.setState({ users: this.state.users });
  };

  deleteUser = (id) => {
    this.state.users.delete(id);
    this.setState({ users: this.state.users });
  };

  sendMessage = () => {
    if(this.state.currentUser){
      this.state.currentUser.get(this.state.currentUser).push({
        body: this.state.message,
        timestamp: new Date(),
      });
      socket.emit('send-message', this.state.currentUser, {
        body: this.state.message,
        timestamp: new Date(),
      });
      this.setState({ message: ''});
    }
  };

    }

  render() {
    const {
      currentRoom,
      message,
      room1: { messages: room1Messages },
      room2: { messages: room2Messages },
    } = this.state;
    return (
      <>
        <div className={styles.roomContainer}>
          <MessagesList messages={room1Messages} />
          <MessagesList messages={room2Messages} />
        </div>
        <label>
          <input
            type="radio"
            name={'currentRoom'}
            value={'room1'}
            checked={currentRoom === 'room1'}
            onChange={this.switchRoom}
          />
          <span>Send message to Room1</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            name={'currentRoom'}
            value={'room2'}
            checked={currentRoom === 'room2'}
            onChange={this.switchRoom}
          />
          <span>Send message to Room2</span>
        </label>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => {
              this.setState({ message: e.target.value });
            }}
          />
          <button onClick={this.sendMessage}>Send message</button>
        </div>
      </>
    );
  }
}
export default App;
