const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes= require("./routes/AuthRoutes");
const ActivityRoutes = require("./routes/ActivityRoutes");
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));


app.use('/api/auth/', AuthRoutes)
app.use('/api/activities/', ActivityRoutes)

const PORT= 5000;

app.get('/', (req, res) =>{
    res.send('server running........')
})


app.listen(PORT, () => console.log('server runing in port', PORT))