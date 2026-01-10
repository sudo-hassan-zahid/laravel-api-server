import { useEffect, useState } from 'react';
import axiosClient from '../api/axios';
import PostCard from '../components/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await axiosClient.get('/api/posts');
            // Assuming API returns array directly based on Controller
            // Controller: return response()->json(Post::with('user')->get(), 200);
            setPosts(data.reverse()); // Show newest first
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const { data } = await axiosClient.post('/api/posts', { title, content });
            // The returned post doesn't include user relationship usually unless we load it, 
            // but for instant feedback we can simulate or re-fetch.
            // Let's re-fetch to get user data correctly or manually merge.
            await fetchPosts();
            setTitle('');
            setContent('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Create Post Widget */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">✨</span> Share something cool
                </h2>
                <form onSubmit={handleCreatePost} className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What's on your mind? (Title)"
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                        required
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tell us more..."
                        rows="3"
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition resize-none"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreating ? 'Publishing...' : 'Post Update'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Feed */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <div className="space-y-6">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                    {posts.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No posts yet. Be the first to share!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
