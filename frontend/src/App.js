import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Feedback Form</Link>
        <Link to="/feedback" style={styles.link}>Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/feedback" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#1d72e8',
    padding: '12px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default App;
