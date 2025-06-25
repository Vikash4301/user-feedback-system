import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback', formData);
      alert('Feedback submitted!');
      setFormData({
        name: '',
        email: '',
        category: '',
        feedback: '',
      });
    } catch (error) {
      alert('Failed to submit. Make sure backend is running.');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Feedback</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            style={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Feedback Type</label>
          <div style={styles.radioGrid}>
            {['Suggestion', 'Bug Report', 'Feature Request', 'Other'].map((cat) => (
              <label key={cat} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={formData.category === cat}
                  onChange={handleChange}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label>Feedback</label>
          <textarea
            name="feedback"
            style={styles.textarea}
            value={formData.feedback}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px 40px', // left padding to push it from the screen edge
    fontFamily: 'sans-serif',
    maxWidth: '1000px',
  },
  title: {
    fontSize: '30px',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'flex-start', 
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
    maxWidth: '400px', 
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '120px',
    resize: 'vertical',
  },
  radioGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '15px',
  },
  button: {
    backgroundColor: '#1d72e8',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default FeedbackForm;
