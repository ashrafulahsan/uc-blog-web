import React from 'react';
import './Post.css';

const BASE_URL = 'http://127.0.0.1:8000/';

function Post({ post }) {
  // compute the URL on every render so it stays in sync with props
  // ensure we don't accidentally build a double-slash URL
  const imageUrl = (() => {
    if (!post?.image_url) return '';
    // if the backend already returned a full URL, use it directly
    if (post.image_url.startsWith('http')) return post.image_url;
    // otherwise combine with BASE_URL and strip any leading slash
    return BASE_URL + post.image_url.replace(/^\/+/, '');
  })();

  return (
    <div className="blog_post">
      <h2 className="post_title">{post.title}</h2>
      <p className="post_description">{post.content}</p>
      author: <span className="post_author">{post.author}</span>

      {imageUrl ? (
        <img
          className="post_image"
          src={imageUrl}
          alt={post.title || 'Post image'}
        />
      ) : (
        <div className="no_image">No image available</div>
      )}
      <div className="post_date">{post.created_at}</div>
      <div className='post_delete'>
        <button onClick={() => alert('Delete functionality not implemented yet')}>Delete</button>
      </div>
    </div>
  );
}

export default Post