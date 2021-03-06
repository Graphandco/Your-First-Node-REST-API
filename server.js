require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
const codingTipsRouter = require('./routes/coding-tips');
app.use('/subscribers', subscribersRouter);
app.use('/coding-tips', codingTipsRouter);

app.listen(8080, () => console.log('Server Started'));
