import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import CommentSection from '../components/CommentSection';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(username)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
    } else {
      setPost(data);
    }
  };

  if (!post) {
    return <div className="text-center mt-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-green-400">{post.title}</h1>
        <p className="text-gray-400 mb-4">
          By {post.profiles.username} on {new Date(post.created_at).toLocaleDateString()}
        </p>
        <div className="prose prose-invert max-w-none mb-8">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-300">{paragraph}</p>
          ))}
        </div>
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
};

export default BlogPost;