import React, { useState } from 'react';
import './Post.css';

const BASE_URL = 'http://127.0.0.1:8000/';

function NewPost() {
    const [image, setImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setText] = useState('');

    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }    

    const handleCreate = (e) => {
        e?.preventDefault();

        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        const requestOptions = {
            method: 'POST',
            body: formData,
        }; 

        fetch(BASE_URL + 'posts/image', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response
            })
            .then(data => {
                createPost(data.filename);
            })
            .catch(error => {
                console.log(error)  
            })
            .finally(() => {
                setImage(null);
                setFileInputKey(currentKey => currentKey + 1);
            });
    }

    const createPost = (imageUrl) => {
        const json_string = JSON.stringify({
            image_url: imageUrl,
            author: author,
            title: title,
            content: content
        });

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: json_string
        };

        fetch(BASE_URL + 'posts/create', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response
            })
            .then(data => {
                window.location.reload();
                window.scrollTo(0, 0);
            })
            .catch(error => {
                console.log(error)
            });
    }    

    return (
        <div className="new_post">
            <h2>Create New Post</h2>
            <div className="image_upload">
                <input key={fileInputKey} type="file" onChange={handleImageUpload}/>
            </div>    

            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setText(e.target.value)}
            />
            
            <button onClick={handleCreate}>Create Post</button>
        </div>
    );

}

export default NewPost;
