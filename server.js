import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import seoRoutes from './routes/seoRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
// import themeRoutes from './routes/themeRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import listingRoutes from './routes/listingRoutes.js'
import agentRoutes from './routes/agentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/',(req, res)=>{
  res.send("backend Working Fine")
})

// Test route to check database connection
app.get('/api/test', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    res.json({ 
      message: 'Backend is working', 
      database: states[dbState],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Backend error', details: error.message });
  }
});
// Routes
app.use('/api', seoRoutes);
app.use('/api', pageRoutes);
// app.use('/api', themeRoutes);
app.use('/api', blogRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api', agentRoutes);
app.use('/api', userRoutes);
app.use('/api', leadRoutes);
app.use('/api', teamRoutes);
app.use('/uploads', express.static('uploads')); // serve images

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
  })
  .catch((err) => console.error(err));

  