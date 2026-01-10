import { useState } from 'react';
import axiosClient from '../api/axios';

export default function PostCard({ post }) {
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleComment = async (e) => {
        e.preventDefault();
        setIsCommenting(true);
        try {
            const { data } = await axiosClient.post(`/api/posts/${post.id}/comments`, {
                content: newComment
            });
            setComments([...comments, data]);
            setNewComment('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsCommenting(false);
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 hover:border-purple-500/30 transition duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg">
                        {post.user?.name?.[0].toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-white leading-tight">{post.title}</h3>
                        <p className="text-sm text-gray-400">@{post.user?.username || 'user'} • <span className="text-xs opacity-60">{new Date(post.created_at).toLocaleDateString()}</span></p>
                    </div>
                </div>
            </div>

            <p className="text-gray-300 mb-6 whitespace-pre-line leading-relaxed">
                {post.content}
            </p>

            <div className="border-t border-white/5 pt-4">
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    <span>{comments.length} Comments</span>
                </button>

                {showComments && (
                    <div className="mt-4 space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="bg-black/20 rounded-lg p-3 ml-4 border-l-2 border-purple-500/50">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-sm font-semibold text-purple-300">{comment.user?.username || 'User'}</span>
                                    <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-300">{comment.content}</p>
                            </div>
                        ))}

                        <form onSubmit={handleComment} className="flex gap-2 mt-4 ml-4">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            <button
                                type="submit"
                                disabled={!newComment.trim() || isCommenting}
                                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-500 disabled:opacity-50 transition"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
