
const pokeApi = {}

async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height
    pokemon.stats = pokeDetail.stats
    pokemon.species = pokeDetail.species
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities
    pokemon.eggGroups = pokeDetail.eggGroups
    pokemon.eggCycle = pokeDetail.eggCycle
        

    if (pokeDetail.abilities) {
        pokemon.abilities = pokeDetail.abilities.map(
          (abilitySlot) => abilitySlot.ability.name
        );
      }
   
      try {
        const response = await fetch(pokeDetail.species.url);
        const resp = await response.json();
    
        if (resp.habitat) {
          pokemon.habitat = resp.habitat.name;
        }
    
        if (resp.gender_rate !== -1) {
          let female = (resp.gender_rate / 8) * 100;
          pokemon.gender = `Macho ${100 - female}%, Fêmea ${female}%`;
        }else{
          pokemon.gender = 'Genderless'
        }
    

        if (resp.egg_groups) {
          pokemon.eggGroups = resp.egg_groups.map((eggGroup) => eggGroup.name);
        }
    
        if (resp.hatch_counter !== undefined) {
          pokemon.eggCycle = 255 * (resp.hatch_counter + 1);
        }
      } catch (err) {
        console.error(err);
      }

    let somaTotal = 0;
      if (pokeDetail.stats) {
        for (const statSlot of pokeDetail.stats) {
          switch (statSlot.stat.name) {
            case "hp":
              pokemon.baseStats.hp = statSlot.base_stat;
              somaTotal = somaTotal + pokemon.baseStats.hp;
              break;
            case "attack":
              pokemon.baseStats.attack = statSlot.base_stat;
              somaTotal = somaTotal + pokemon.baseStats.attack;
              break;
            case "defense":
              pokemon.baseStats.defense = statSlot.base_stat;
              somaTotal = somaTotal + pokemon.baseStats.defense;
              break;
            case "special-attack":
              pokemon.baseStats.specialAttack = statSlot.base_stat;
              somaTotal = somaTotal + pokemon.baseStats.specialAttack;
              break;
            case "special-defense":
              pokemon.baseStats.specialDefense = statSlot.base_stat;
              somaTotal = somaTotal + pokemon.baseStats.specialDefense;
              break;
            case "speed":
              pokemon.baseStats.speed = statSlot.base_stat;
              somaTotal = somaTotal + pokemon.baseStats.speed;
              break;
          }
        }
      }

      pokemon.baseStats.total = somaTotal;
      console.log(somaTotal);

    const types = pokeDetail.types.map((i) => i.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


    
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
