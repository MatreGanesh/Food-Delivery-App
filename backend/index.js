const express = require('express');
const connectDB = require('./db')
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');

// .env Connections 
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

//mongoDB Connection
connectDB(MONGODB_URL);


//Middleware
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Routes
const foodMenuRoutes = require('./routes/FoodDataRoute')
app.use('/api/food_menu', foodMenuRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});


app.listen(PORT, () => {
    console.log(`Server is running on localhost : ${PORT}`);
})