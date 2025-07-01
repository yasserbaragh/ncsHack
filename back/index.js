<<<<<<< HEAD
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testDBConnection } from './config/db.js'; 
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
=======
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { verifySignature } = require('@chargily/chargily-pay');
const cookieParser = require('cookie-parser');

const API_SECRET_KEY = process.env.PAY_SEC;
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: ['http://localhost:4000', 'http://localhost:3000', 'http://localhost:5173'],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser())

<<<<<<< HEAD
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser())

app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);

// Import routes
const investorsRoutes = require('./routes/investors');
const projectsRoutes = require('./routes/projects');
const submissionsRoutes = require('./routes/submissions');
const qcmsRoutes = require('./routes/qcms');
const questionsRoutes = require('./routes/questions');
const responsesRoutes = require('./routes/responses');
const clientsRoutes = require('./routes/clients');
const clientQuestionRoutes = require('./routes/clientQuestion');
const clientQcmRoutes = require('./routes/clientQcm');
const clientProfileDataRoutes = require('./routes/clientProfileData');
const usersRoutes = require('./routes/users');
const adminsRoutes = require('./routes/admins');
const authRoutes =require('./routes/authRoutes.js');


// Use routes
app.use('/investors', investorsRoutes);
app.use('/projects', projectsRoutes);
app.use('/submissions', submissionsRoutes);
app.use('/qcms', qcmsRoutes);
app.use('/questions', questionsRoutes);
app.use('/responses', responsesRoutes);
app.use('/clients', clientsRoutes);
app.use('/client-question', clientQuestionRoutes);
app.use('/client-qcm', clientQcmRoutes);
app.use('/client-profile', clientProfileDataRoutes);
app.use('/users', usersRoutes);
app.use('/admins', adminsRoutes);
app.use('/auth', authRoutes);

app.post('/webhook', function (req, res) {
  const signature = req.get('signature') || '';
  const payload = req.rawBody;

  if (!signature) {
    console.log('Signature header is missing');
    res.sendStatus(400);
    return;
  }

  try {
    if (!verifySignature(payload, signature, API_SECRET_KEY)) {
      console.log('Signature is invalid');
      res.sendStatus(403);
      return;
    }
  } catch (error) {
    console.log(
      'Something happened while trying to process the request to the webhook'
    );
    res.sendStatus(403);
    return;
  }

  const event = req.body;
  console.log(event); // You can use event.type to handle logic

  res.sendStatus(200);
});

=======
app.use('/auth', authRoutes);
>>>>>>> 64fc22a (Add Authentification)

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  testDBConnection();
});
