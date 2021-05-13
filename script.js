const numPokemon = 151;

const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {

    const promises = [];
    for (let i = 1; i <= numPokemon; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(", ")
        }));
        for (let j = 1; j <= numPokemon; j++) {
            displayPokemon(j - 1, pokemon);
        }
    });
};

/*const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokemon => `
    <li class = "card"  oneclick = "selectPokemon(${pokemon.id})">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
}*/

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

fetchPokemon();