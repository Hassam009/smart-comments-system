import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsService } from '../services/api';
import type { Post } from '../types';
import { BookOpen, User } from 'lucide-react';

/**
 * The homepage shows a list of blog posts in a grid.
 * Each post is represented as a clickable card.
 */
const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * Fetches all posts from the backend on component mount.
         */
        const fetchPosts = async () => {
            try {
                const data = await postsService.getAll();
                setPosts(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'grid', placeItems: 'center', height: '50vh' }}>
                <div style={{ color: 'var(--text-muted)' }}>Loading posts...</div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Welcome to the Blog</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    Read our latest engineering posts and leave your thoughts below.
                </p>
            </header>

            {posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--card-bg)', borderRadius: '1rem' }}>
                    <p>No posts found. Start by adding one in the backend!</p>
                </div>
            ) : (
                <div className="post-grid">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="card"
                            onClick={() => navigate(`/post/${post.id}`)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                                <BookOpen size={16} />
                                <span>Article</span>
                            </div>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                <User size={14} />
                                <span>Engineering Team</span>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
