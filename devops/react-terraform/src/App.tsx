import React, { useEffect, useRef, useState } from 'react';
import logo from './terraform.png';
import './App.css';
import axios from 'axios';
import { socket } from './socket';

const API = process.env.REACT_APP_API;

function App() {
  const [fileData, setFileData] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const sizeRef = useRef<number>(0);
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
    if (!blobRef.current || blobRef.current?.size <= sizeRef.current) {
      socket.emit('requestFile', { fileName: 'test.png' });
    }

    socket.on('fileSize', (size) => {
      console.log('size: ', size);
      sizeRef.current = size;
    });

    socket.on('fileChunk', (chunk) => {
      if (!blobRef.current || blobRef.current?.size <= sizeRef.current) {
        setFileData((oldChunks) => {
          blobRef.current = new Blob([...oldChunks, chunk], {
            type: 'image/png',
          });
          return [...oldChunks, chunk];
        });
        // console.log('blob: ', blob);
        // blobRef.current = blob;
      }
    });

    socket.on('fileComplete', () => {
      setImageUrl(URL.createObjectURL(blobRef.current as Blob));
    });

    return () => {
      // socket.disconnect();
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl); // Clean up
      }
    };
  }, [imageUrl]);
  console.log('blobRef.current: ', blobRef.current);

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
