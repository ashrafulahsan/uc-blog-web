import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post';

const BASE_URL = 'http://127.0.0.1:8000/';

function App() {

  const[posts, setPosts] = useState([]);
  
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
      <div className="blog_title">
        <h1>My Blog</h1>
      </div>
      <div className="blog_posts">
        {posts.map((p) => (
          <Post key={p.id || p.image_url} post={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
