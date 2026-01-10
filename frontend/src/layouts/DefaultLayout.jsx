import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DefaultLayout() {
    const { user, token, logout, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // Explicitly check for token to redirect if not authenticated
    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-purple-500/30">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <span className="font-bold text-white">L</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Laravel API
                            </span>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-medium text-white">{user?.name}</div>
                                    <div className="text-xs text-gray-400">@{user?.username || 'user'}</div>
                                </div>
                                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 border-2 border-black flex items-center justify-center text-sm font-bold">
                                    {user?.name?.[0]?.toUpperCase()}
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="text-sm text-gray-400 hover:text-white transition-colors py-2"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
