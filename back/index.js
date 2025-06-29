const express = require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
    origin: ['http://localhost:4000', 'http://localhost:3000', 'http://localhost:5173'],
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});