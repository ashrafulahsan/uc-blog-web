import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://127.0.0.1:8000/';

function App() {

  const[post, setPosts] = useState([]);
  
  useEffect(() => {
    fetch(BASE_URL + 'posts/all')
      .then(response => {
        const json = response.json();
        console.log(json);
        if (response.ok) {
          return json;
        }  
      })
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
