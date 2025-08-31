const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const noteRoutes = require('./routes/note.routes');

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://notestack-six.vercel.app"],
  credentials: true
}));
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', noteRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

module.exports = app;
