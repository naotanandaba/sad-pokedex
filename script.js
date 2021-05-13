const numPokemon = 151;

const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = async () => {
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=${numPokemon}`;
        const res = await fetch(pokemonURL);
        const data = await res.json();
        const pokemon = data.results.map((result, index) => 
        ({
            ...result,
            id: index +1,
            image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png` 
        }));
        displayPokemon(pokemon);
    };

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokemon => `
    <li class = "card"  oneclick = "selectPokemon(${pokemon.id})">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
}

const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPopUp(pokemon);
    console.log(id);
}

fetchPokemon();