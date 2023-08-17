import { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './component/Chat.jsx';

const socket = io.connect("http://localhost:3001")

function App() {

  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };


  return (
    <div className='App'>
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3> Join Chat</h3>
          <input type='text' placeholder='John'
            onChange={(event) => {
              setUserName(event.target.value)
            }}
          />
          <input type='text' placeholder='Room Id'
            onChange={(event) => {
              setRoom(event.target.value)
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )
      :(
        <Chat socket={socket} username={userName} room={room} />
      )}

    </div>
  );
}

export default App;
