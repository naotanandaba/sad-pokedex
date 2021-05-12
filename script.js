const numPokemon = 151;

/*const make1PokemonEntry = (id) => {
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
*/

const pokedex = document.getElementById("pokedex");

console.log(pokedex);

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
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(pokemon => `
    <li class = "card">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">Type: ${pokemon.type}</p>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();
