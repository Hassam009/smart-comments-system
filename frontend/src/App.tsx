import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Moderator from './pages/Moderator';
import { Shield, Layout } from 'lucide-react';

function App() {
  return (
    <Router>
      <nav>
        <div className="nav-content">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem' }}>
            <Layout className="text-primary" />
            <span style={{ background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              SmartComments
            </span>
          </Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/">Blog</Link>
            <Link to="/moderator" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Shield size={18} />
              Moderator
            </Link>
          </div>
        </div>
      </nav>

      <main className="container animate-fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/moderator" element={<Moderator />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
