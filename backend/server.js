const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const Feedback=require('./models/Feedback');

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.error('DB connection error',err);
});

app.post('/feedback', async (req, res) => {
  try {
    const { name, email, category, feedback } = req.body;

    const newFeedback = new Feedback({
      name,
      email,
      category,
      feedback
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json({
      message: 'Feedback saved successfully',
      feedback: savedFeedback,
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});