

const make1PokemonEntry = (id) => {
    const divisio = document.createElement('DIV');
    divisio.classList.add('pokemon');
    const photoEntry = document.createElement('PICTURE');
    const image = document.createElement('IMG');
    image.setAttribute('src', `assets/images/${id}.webp`);
    photoEntry.appendChild(image);
    divisio.appendChild(photoEntry);
    document.body.appendChild(divisio);
};

make1PokemonEntry(1);

const getAllPokemon = async () => {
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    const request = await fetch(pokemonURL);
    pokesJSON = await request.json();
    allPokemonInfo = [...pokesJSON.results];
    console.log(allPokemonInfo);
}

getAllPokemon();

const fetchPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/1`;
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            const pokemon = {};
            pokemon['name'] = data.name;
            pokemon['id'] = data.id;
            pokemon['image'] = data.sprites['front_default'];
            data.types.forEach((type) => {
                pokemon['type'] = pokemon['type'] + ", " + type.name;
            })
            console.log(pokemon);
        });
}

fetchPokemon();
