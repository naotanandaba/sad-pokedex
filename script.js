const numPokemon = 151;

const pokedex = document.getElementById("pokedex");

const llistap = [];


//TODO: Afegir id="card" i data-name="nompokemon" a cada un dels li, i escoltar els events amb id card i compararlos deprés amb data-name

const fetchPokemon = async () => {
    //Obtenció de l'objecte amb tots els pokemon i links a la seva informació
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=${numPokemon}`;
    const res = await fetch(pokemonURL);
    const data = await res.json();
    let pokesilinks = data.results.map((result, index) => ({
        ...result, //result és un objecte amb name i url com a atributs
        id: index + 1
    }))

    //Codi de l'ordenat abans de mostrar-los
    const select = document.getElementById('select');
    if (select.value == 'nom') {
        pokesilinks = pokesilinks.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
    select.addEventListener('change', () => {
        location.reload();
    });

    //Mostratge dels pokemon
    for (let j = 0; j < numPokemon; j++) {
        const pokemon = await obtainPokemon(pokesilinks[j]);
        displayPokemon(pokemon);
        llistap.push(pokemon);
    }
};

//A partir d'1 objecte pokemon, es realitza el codi HTML amb les classes CSS adients per a visualitzar-lo
const displayPokemon = (pokemon) => {
    const li = document.createElement('LI');

    li.classList.add('card');
    //li.id = 'card';
    //li.setAttribute('data-name', pokemon.name);
    const modal = document.getElementById('modal');
    const height = document.getElementById('height');
    const weight = document.getElementById('weight');
    li.addEventListener('click', (e) => {
        if (!e.target.classList.contains('typebox')) {
            modal.classList.add('modal--show');
            height.textContent = 'Height: ' + pokemon.height / 10 + ' ' + 'm';
            //height.classList.add('modal-content');
            weight.textContent = 'Weight: ' + pokemon.weight / 10 + ' ' + 'kg';
            //height.classList.add('modal-content');
        }
    });
    modal.addEventListener('click', (e) => {
        console.log(e.target);
        if (!e.target.classList.contains('modal-content') && !e.target
            .parentElement.classList.contains('modal-content')) {
            modal.classList.remove('modal--show');
        }
    });
    const img = document.createElement('IMG');
    img.classList.add('card-image');
    img.setAttribute('src', `${pokemon.image}`);
    const h2 = document.createElement('H2');
    h2.classList.add('card-title');
    h2.textContent = `${pokemon.id}. ${pokemon.name}`;
    const p = document.createElement('P');

    p.textContent = 'Type:';
    pokemon.types.forEach((type) => {
        const a = document.createElement('A');
        const nameLink = type.substring(0, 1).toUpperCase() + type.substring(1, type.length);
        a.setAttribute('href', `https://bulbapedia.bulbagarden.net/wiki/${nameLink}_(type)`);
        a.setAttribute('target', '_blank');
        a.textContent = type.toUpperCase();
        a.classList.add(type);
        a.classList.add('typebox');

        p.appendChild(a);
    });

    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
    const pokedex = document.getElementById('pokedex');
    pokedex.appendChild(li);
}

//A partir d'1 objecte pokeilink (name, url i id), s'obtenen les dades del pokemon 
//Es fan els fetchs necessaris
const obtainPokemon = async (pokeilink) => {
    const urlPoke = pokeilink.url;
    const res = await fetch(urlPoke);
    const data = await res.json();
    const URLsDescAbilities = data.abilities.map((dab) => dab = dab.ability.url);
    const descAbilities = [URLsDescAbilities.length];

    //Obtenir les habilitats dels pokes
    for (const i in URLsDescAbilities) {
        descAbilities[i] = await fetch(URLsDescAbilities[i]);
        descAbilities[i] = await descAbilities[i].json();
        for (const desc of descAbilities[i].effect_entries) {
            if (desc.language.name === 'en') {
                descAbilities[i] = desc;
            }
        }
    }
    return {
        name: pokeilink.name,
        id: pokeilink.id,
        types: data.types.map(type => type.type.name),
        height: data.height,
        weight: data.weight,
        stats: data.stats,
        abilities: data.abilities,
        descAb: descAbilities.map((ability) => ability.effect),
        moves: data.moves,
        image: data.sprites.front_default
    }
}

fetchPokemon();

