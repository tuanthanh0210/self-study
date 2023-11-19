import React, { useEffect } from 'react';
import logo from './terraform.png';
import './App.css';
import axios from 'axios';
import { socket } from './socket';

const API = process.env.REACT_APP_API;

function App() {
  useEffect(() => {
    (async () => {
      await axios.get(`${API}/user-mysql`);
      await axios.get(`${API}/random-number-redis`);
    })();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.emit('NEW_MESSAGE', {
      message: 'Hello Terraform',
    });

    socket.on('NEW_MESSAGE', (data) => {
      console.log('data: ', data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://www.terraform.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terraform
        </a>

        <div>
          <button
            className="App-link"
            style={{ color: 'black', margin: '0 10px' }}
            onClick={async () => {
              await axios.post(`${API}/random-number-redis`);
            }}
          >
            Set Ramdom Number Redis
          </button>
          <button
            className="App-link"
            style={{ color: 'black', margin: '0 10px' }}
            onClick={async () => {
              await axios.post(`${API}/user-mysql`);
              await axios.get(`${API}/user-mysql`);
            }}
          >
            Create Ramdom User
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
