const numPokemon = 151;
const modal = document.getElementById('modal');

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
    }
};

//A partir d'1 objecte pokemon, es realitza el codi HTML amb les classes CSS adients per a visualitzar-lo
const displayPokemon = (pokemon) => {
    const pokedex = document.getElementById('pokedex');
    const li = document.createElement('LI');
    li.classList.add('card');

    const height = document.getElementById('height');
    const weight = document.getElementById('weight');
    const abilities = document.getElementById('abilities');
    const tableMoves = document.getElementById('moves');

    //Event que es dispara quan es clica una targeta de pokemon, a excepció de typebox
    li.addEventListener('click', (e) => {
        if (!e.target.classList.contains('typebox')) {
            modal.classList.add('modal--show');
            //Títol
            document.getElementById('namePoke').textContent = pokemon.name.toUpperCase();

            //Creació height i weight
            height.textContent = 'Height: ' + pokemon.height / 10 + ' ' + 'm';
            weight.textContent = 'Weight: ' + pokemon.weight / 10 + ' ' + 'kg';

            //Creació STATS
            for (const stat of pokemon.stats) {
                const td = document.getElementById(stat.stat.name);
                td.textContent = stat.base_stat;
            }

            //Creació ABILITIES (poden ser 1, 2 o 3)
            for (i in pokemon.abilities) {
                const p = document.createElement('P');
                p.textContent = pokemon.abilities[i].ability.name.toUpperCase() + ': ' + pokemon.descAb[i];
                abilities.appendChild(p);
            }

            //Creació MOVES
            const tbody = document.createElement('TBODY');
            for (const move of pokemon.moves) {
                const row = document.createElement('TR');
                const movement = document.createElement('TD');
                movement.textContent = move.move.name;
                row.appendChild(movement);
                const move_learn_method = document.createElement('TD');
                move_learn_method.textContent = move.version_group_details[0].move_learn_method.name;
                row.appendChild(move_learn_method);
                const version_group = document.createElement('TD');
                version_group.textContent = move.version_group_details[0].version_group.name;
                row.appendChild(version_group);
                const level_learned_at = document.createElement('TD');
                if (move.version_group_details[0].level_learned_at === 0) {
                    level_learned_at.textContent = '-';
                } else {
                    level_learned_at.textContent = move.version_group_details[0].level_learned_at;
                }
                row.appendChild(level_learned_at);
                tbody.appendChild(row);
            }
            tableMoves.appendChild(tbody);
        }

    });
    //Creació de la imatge i títol de cada pokemon
    const img = document.createElement('IMG');
    img.classList.add('card-image');
    img.setAttribute('src', `${pokemon.image}`);
    const h2 = document.createElement('H2');
    h2.classList.add('card-title');
    h2.textContent = `${pokemon.id}. ${pokemon.name}`;

    //Creació del text type i les typebox de cada pokemon
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
        a.classList.add('link-no-style');
        p.appendChild(a);
    });

    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
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

//Event que es dispara quan es clica fora de modal-content, per sortir del pop-up de cada pokemon. Borra també les habilitats i els moviments quan es surt del pop up.
modal.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal-content') && !e.target
        .parentElement.classList.contains('modal-content')) {
        modal.classList.remove('modal--show');

        //Remove abilities from the abilities div
        const abilities = document.getElementById('abilities');
        while (abilities.childElementCount != 1) {
            abilities.removeChild(abilities.lastChild);
        }

        //Remove moves from moves div
        const tableMoves = document.getElementById('moves');
        while (tableMoves.childElementCount != 2) {
            tableMoves.removeChild(tableMoves.lastChild);
        }
    }
});

//Funció principal
fetchPokemon();