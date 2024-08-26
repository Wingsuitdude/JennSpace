import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, profiles(username)')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to comment.');
      return;
    }
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, user_id: user.id, content: newComment }]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setNewComment('');
      fetchComments();
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      console.log('Comment deleted successfully');
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4 text-primary">Comments</h3>
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-primary"
            rows="3"
            placeholder="Add a comment..."
            required
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="mb-4 text-gray-600">Please sign in to leave a comment.</p>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-800 mb-2">{comment.content}</p>
            <p className="text-sm text-gray-600">
              By {comment.profiles.username} on {new Date(comment.created_at).toLocaleDateString()}
            </p>
            {isAdmin && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;