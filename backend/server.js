import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import notesRoutes from './routes/notesRoutes.js'
dotenv.config();

const app = express(); // Use express 
const PORT = process.env.PORT;
app.use(cors()); // uses cors in all routes / If you are using front
app.use(express.json())


app.use("/notas", notesRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
