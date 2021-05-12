const numPokemon = 151;

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

    const promises = [];
    for(let i = 1; i < numPokemon; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    
    Promise.all(promises).then(results =>{
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(", ")
        }));
        console.log(pokemon);
    });
};

fetchPokemon();
