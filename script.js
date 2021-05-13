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

const fetchPokemon = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${numPokemon}`;
        const res = await fetch(url);
        const data = await res.json();
        const pokemon = data.results.map((result, index) => 
        ({
            ...result,
            id: index +1,
            image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png` 
        }));
        displayPokemon(pokemon);
    };

    const displayPokemon = (pos, pokemon) => {
        const li = document.createElement('LI');
        li.classList.add('card');
        const img = document.createElement('IMG');
        img.classList.add('card-image');
        img.setAttribute('src', `${pokemon[pos].image}`);
        const h2 = document.createElement('H2');
        h2.classList.add('card-title');
        h2.textContent = `${pokemon[pos].id}. ${pokemon[pos].name}`;
        const p = document.createElement('P');
    
        if (pokemon[pos].type === 'planta') {
            p.classList.add('planta');
        }
        p.textContent = `Type: ${pokemon[pos].type}`;
        li.appendChild(img);
        li.appendChild(h2);
        li.appendChild(p);
        const pokedex = document.getElementById('pokedex');
        pokedex.appendChild(li);
}

const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPopUp(pokemon);
    console.log(id);
}

const dispalyPopUP = (pokemon) => {
    const type = pokemon.types.map(type => type.type.name).join(", ")
    console.log(type)
}

fetchPokemon();