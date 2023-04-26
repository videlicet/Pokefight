import { Router } from 'express';
import { getAllPokemon, getOnePokemon, getOnePokemonInfo} from '../controllers/orders.js';

const pokemonRouter = Router();

pokemonRouter.route('/')
    .get(getAllPokemon)

pokemonRouter.route('/:id')
    .get(getOnePokemon)

pokemonRouter.route('/:id/:info')
    .get(getOnePokemonInfo)

export default pokemonRouter;
