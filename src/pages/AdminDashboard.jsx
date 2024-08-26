import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPost) {
      const { data, error } = await supabase
        .from('posts')
        .update({ title, content })
        .eq('id', editingPost.id);

      if (error) {
        console.error('Error updating post:', error);
      } else {
        console.log('Post updated successfully');
        setEditingPost(null);
      }
    } else {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ title, content }]);

      if (error) {
        console.error('Error creating post:', error);
      } else {
        console.log('Post created successfully');
      }
    }
    setTitle('');
    setContent('');
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      console.log('Post deleted successfully');
      fetchPosts();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Admin Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
          className="w-full mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          rows="4"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition duration-300">
          {editingPost ? 'Update Post' : 'Create Post'}
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Existing Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-400">{post.title}</h3>
            <p className="mb-2 text-gray-300">{post.content.substring(0, 100)}...</p>
            <button
              onClick={() => handleEdit(post)}
              className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-400 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-400 transition duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;