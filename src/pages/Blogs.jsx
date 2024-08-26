import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center mt-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-400">Blog Posts</h1>
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-blue-300">{post.title}</h2>
                <p className="text-gray-400 mb-4">
                  Posted on {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-300 mb-4">{post.content.substring(0, 150)}...</p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="text-green-400 hover:text-green-300 transition duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;