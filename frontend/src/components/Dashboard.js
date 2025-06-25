import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, [categoryFilter, sortOrder, fromDate, toDate]);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get('http://localhost:5000/feedback');
      let data = res.data;

      
      if (categoryFilter) {
        data = data.filter(item => item.category === categoryFilter);
      }

      
      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999); 
        data = data.filter(item => {
          const createdAt = new Date(item.createdAt);
          return createdAt >= from && createdAt <= to;
        });
      }

      
      data.sort((a, b) => {
        return sortOrder === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      });

      setFeedbacks(data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  };

  const categoryCounts = feedbacks.reduce((acc, curr) => {
  acc[curr.category] = (acc[curr.category] || 0) + 1;
  return acc;
}, {});

const chartData = {
  labels: Object.keys(categoryCounts),
  datasets: [
    {
      label: 'Feedback by Category',
      data: Object.values(categoryCounts),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      borderColor: '#fff',
      borderWidth: 1,
    },
  ],
};


  return (
    <div style={styles.container}>
  <h2 style={styles.title}>Feedback Dashboard</h2>

  <div style={styles.layout}>
    {/* Left Panel: Filters + Feedback List */}
    <div style={styles.leftPanel}>
      <div style={styles.controls}>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={styles.select}>
          <option value="">All Categories</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Other">Other</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={styles.select}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={styles.select} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={styles.select} />
      </div>

      <ul style={styles.list}>
        {feedbacks.length > 0 ? (
          feedbacks.map((item) => (
            <li key={item._id} style={styles.card}>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Feedback:</strong> {item.feedback}</p>
              <p><strong>Time:</strong> {new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </li>
          ))
        ) : (
          <li style={{ textAlign: 'center', padding: '20px' }}>No feedback found.</li>
        )}
      </ul>
    </div>

    {/* Right Panel: Pie Chart */}
    <div style={styles.rightPanel}>
      <Pie data={chartData} />
    </div>
  </div>
</div>

  );
};

const styles = {
  container: {
    padding: '20px 40px',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '26px',
    marginBottom: '16px',
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '20px',
    alignItems: 'center',
  },
  select: {
    padding: '8px',
    fontSize: '14px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#f9f9f9',
  },
  layout: {
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
},

leftPanel: {
  flex: 2,
},

rightPanel: {
  flex: 1,
  backgroundColor: '#fff',
  padding: '10px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  minWidth: '300px',
},

};

export default Dashboard;
