import { useEffect, useState } from 'react';
import { moderatorService } from '../services/api';
import type { Comment } from '../types';
import { Shield, AlertTriangle, User, MessageCircle } from 'lucide-react';

/**
 * Moderator View: Displays all comments that have been flagged by the backend.
 * Provides a specialized dashboard for quick review of pending content.
 */
const Moderator = () => {
    const [flaggedComments, setFlaggedComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * Fetch all flagged comments on page load.
         */
        const fetchFlagged = async () => {
            try {
                const data = await moderatorService.getFlaggedComments();
                setFlaggedComments(data);
            } catch (error) {
                console.error('Failed to fetch flagged comments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFlagged();
    }, []);

    /**
     * Handles marking a comment as "safe".
     */
    const handleApprove = async (id: number) => {
        try {
            await moderatorService.approveComment(id);
            setFlaggedComments(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to approve comment:', error);
            alert('Error approving comment. Please try again.');
        }
    };

    /**
     * Handles deleting a comment entirely.
     */
    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        
        try {
            await moderatorService.deleteComment(id);
            setFlaggedComments(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete comment:', error);
            alert('Error deleting comment. Please try again.');
        }
    };

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading moderation queue...</div>;

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Shield size={42} className="text-primary" />
                <div>
                    <h1 style={{ fontSize: '2.5rem' }}>Moderator Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Reviewing comments that were flagged by the "Smart Comments" system.
                    </p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {flaggedComments.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '1rem', border: '1px dashed var(--success)' }}>
                        <p style={{ color: 'var(--success)' }}>System is clear! No comments currently need review.</p>
                    </div>
                ) : (
                    flaggedComments.map((comment) => (
                        <div
                            key={comment.id}
                            className="card"
                            style={{
                                borderColor: 'var(--danger)',
                                borderLeft: '4px solid var(--danger)',
                                cursor: 'default'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', fontWeight: '700' }}>
                                    <User size={16} />
                                    {comment.author}
                                </div>
                                <span className="badge-flagged" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <AlertTriangle size={12} />
                                    Flagged
                                </span>
                            </div>

                            <div style={{ marginBottom: '1rem', color: '#cbd5e1' }}>
                                <MessageCircle size={14} style={{ display: 'inline', marginRight: '0.5rem', opacity: '0.5' }} />
                                "{comment.text}"
                            </div>

                            <div style={{
                                marginTop: '1.5rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid var(--border)',
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <span>Post ID: #{comment.post_id}</span>
                                <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={() => handleApprove(comment.id)}
                                    className="btn btn-primary" 
                                    style={{ flex: 1, fontSize: '0.875rem', padding: '0.5rem' }}
                                >
                                    Approve
                                </button>
                                <button 
                                    onClick={() => handleDelete(comment.id)}
                                    className="btn" 
                                    style={{ flex: 1, fontSize: '0.875rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Moderator;
