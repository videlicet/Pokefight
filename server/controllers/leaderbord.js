export const getAllFights = async (req, res, next) => {
try {
    res.json(pokemon)
} catch (error) {
    next(error);
}
};

export const postFight = async (req, res, next) => {
try {
    let reqPokemon = pokemon.filter(e => e.id == req.params.id)
    res.json(reqPokemon)
} catch (error) {
    next(error);
}
};
