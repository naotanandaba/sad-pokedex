// URL obtain all pokemon
const URL_ALL_POKEMON = 'https://pokeapi.co/api/v2/pokemon';
// Array to save all info
let allPokemonInfo = [];
// Array pokedex
let pokedex = [];
// Container for scss
const pokeContainer = document.getElementById('pokeContainer');
// number of pokemons in our pokedex
const numberPokemon = 151;
// Get Pokemon Api info
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    console.log(pokemon);
}
getPokemon(1);