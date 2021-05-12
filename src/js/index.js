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