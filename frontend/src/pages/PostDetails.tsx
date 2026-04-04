import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postsService } from '../services/api';
import type { Post, Comment, CommentCreate } from '../types';
import { ChevronLeft, MessageSquare, AlertTriangle, Send } from 'lucide-react';

const PostDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<CommentCreate>({
        author: '',
        text: ''
    });

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            try {
                const data = await postsService.getById(Number(id));
                setPost(data);
                setComments(data.comments || []);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !formData.author || !formData.text) return;

        setSubmitting(true);
        try {
            const newComment = await postsService.addComment(Number(id), formData);
            setComments([...comments, newComment]);
            setFormData({ author: '', text: '' });
        } catch (error) {
            console.error('Failed to add comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="container">Loading post details...</div>;
    if (!post) return <div className="container">Post not found.</div>;

    return (
        <div className="animate-fade-in">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                <ChevronLeft size={20} />
                Back to Blog
            </Link>

            <article style={{ borderBottom: '1px solid var(--border)', paddingBottom: '3rem', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>{post.title}</h1>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    {post.body}
                </div>
            </article>
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <MessageSquare className="text-primary" />
                    <h2 style={{ fontSize: '1.75rem' }}>Comments ({comments.length})</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            style={{
                                padding: '1.5rem',
                                background: 'var(--card-bg)',
                                borderRadius: '1rem',
                                border: '1px solid var(--border)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{comment.author}</span>
                                {comment.flagged && (
                                    <span className="badge-flagged" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <AlertTriangle size={12} />
                                        <span>Under Review</span>
                                    </span>
                                )}
                            </div>
                            <p style={{ color: comment.flagged ? 'var(--text-muted)' : 'var(--text)' }}>
                                {comment.text}
                            </p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                                {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    ))}

                    {comments.length === 0 && (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                            No comments yet. Be the first to share your thoughts!
                        </p>
                    )}
                </div>
                <form onSubmit={handleSubmit} style={{ marginTop: '4rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Leave a comment</h3>
                    <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        style={{ marginBottom: '0.5rem' }}
                    />
                    <textarea
                        rows={4}
                        placeholder="What are your thoughts?"
                        required
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        {submitting ? 'Submitting...' : (
                            <>
                                <Send size={18} />
                                Post Comment
                            </>
                        )}
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Note: Comments are automatically scanned for quality.
                    </p>
                </form>
            </section>
        </div>
    );
};

export default PostDetails;
