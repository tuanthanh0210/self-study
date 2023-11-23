import React, { useEffect, useRef, useState } from 'react';
import logo from './terraform.png';
import './App.css';
import axios from 'axios';
import { socket } from './socket';

const API = process.env.REACT_APP_API;

function App() {
  const [fileData, setFileData] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const blobRef = useRef<Blob>();

  useEffect(() => {
    (async () => {
      await axios.get(`${API}/user-mysql`);
      await axios.get(`${API}/random-number-redis`);
    })();
  }, []);

  socket.connect();
  useEffect(() => {
    socket.emit('NEW_MESSAGE', {
      message: 'Hello Terraform',
    });

    socket.on('NEW_MESSAGE', (data) => {
      console.log('data: ', data);
    });
  }, []);

  useEffect(() => {
    if (!blobRef.current || blobRef.current?.size <= fileSize) {
      socket.emit('requestFile', { fileName: 'test.png' });
    }

    socket.on('fileSize', (size) => {
      console.log('size: ', size);
      setFileSize(size);
    });

    socket.on('fileChunk', (chunk) => {
      setFileData((oldChunks) => [...oldChunks, chunk]);
    });

    socket.on('fileComplete', () => {
      const blob = new Blob(fileData, { type: 'image/png' });
      console.log('blob: ', blob);
      blobRef.current = blob;
      setImageUrl(URL.createObjectURL(blob));
    });

    return () => {
      // socket.disconnect();
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl); // Clean up
      }
    };
  }, [imageUrl]);
  console.log('imageUrl: ', imageUrl);

  return (
    <div className="App">
      <header className="App-header">
        <img width={1000} height={600} src={imageUrl} alt="" />
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
