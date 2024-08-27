import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (username)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Fetched posts:', data);
      setPosts(data);
    } catch (error) {
      setError('Error fetching posts: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingPost) {
        console.log('Updating post:', editingPost.id, { title, content });
        const { data, error } = await supabase
          .from('posts')
          .update({ title, content })
          .eq('id', editingPost.id)
          .eq('author_id', user.id)  // Ensure the post belongs to the current user
          .select();

        if (error) throw error;
        console.log('Post updated successfully:', data);
        setEditingPost(null);
      } else {
        console.log('Creating new post:', { title, content, author_id: user.id });
        const { data, error } = await supabase
          .from('posts')
          .insert([{ title, content, author_id: user.id }])
          .select();

        if (error) throw error;
        console.log('Post created successfully:', data);
      }
      setTitle('');
      setContent('');
      await fetchPosts();
    } catch (error) {
      setError('Error saving post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    console.log('Editing post:', post);
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post? This will also delete all associated comments.')) {
      return;
    }
    setLoading(true);
    try {
      const { error: commentsError } = await supabase
        .from('comments')
        .delete()
        .eq('post_id', id);

      if (commentsError) throw commentsError;

      const { error: postError } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('author_id', user.id);  // Ensure the post belongs to the current user

      if (postError) throw postError;

      console.log('Post and associated comments deleted successfully');
      await fetchPosts();
    } catch (error) {
      setError('Error deleting post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-white">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Admin Dashboard</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

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
        {editingPost && (
          <button 
            type="button" 
            onClick={() => {
              setEditingPost(null);
              setTitle('');
              setContent('');
            }} 
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Existing Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-400">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-2">
              Author: {post.profiles?.username || 'Unknown'} | 
              Date: {new Date(post.created_at).toLocaleDateString()}
            </p>
            {post.author_id === user.id && (
              <>
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;