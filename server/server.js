import express from 'express';
import cors from 'cors';
import pokemonRouter from './routes/pokemonRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const port = 4620;
const app = express();
app.use(cors());

app.use(express.json());
app.use('/pokemon', pokemonRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));