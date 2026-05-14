import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express(); // Use express 
const PORT = process.env.PORT;

app.use(cors()); // uses cors in all routes / If you are using front

app.get('/', (req,res) => {
    res.send('Hey hey hey')
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

