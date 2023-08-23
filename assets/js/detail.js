function montarHtmlDetalhePokemon(pokemon) {
    return `
    <div class="pokemon-detail">
    <span class="number">${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types"> 
         ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
    </div>
    <img src="${pokemon.photo}" alt="nomeFote">
</div>

<div class="menu">
                <ul class="lista-menu">
                    <li>
                        <a id="about-link" class="active"  onclick="clickMenu('aboutTable')">About</a>
                    </li>
                    <li>
                        <a id="base-link" onclick="clickMenu('baseStatsTable')">Base Stats</a>
                    </li>
                </ul>
                <div id="aboutTable" class="detail" style="display: inline;">
                            <table>
                                <tbody>
                                    <tr> 
                                        <td>Species</td>
                                        <td>${pokemon.species}</td>
                                    </tr> 
                                    <tr> 
                                        <td>Height</td>
                                        <td>${pokemon.height}</td>
                                    </tr>
                                    <tr> 
                                        <td>Weight</td>
                                        <td>${pokemon.weight}</td>
                                    </tr>
                                    <tr> 
                                        <td>Abilities</td>
                                        <td>${pokemon.abilities}</td>
                                    </tr>
                                    <th>Breeding</th>
                                    <tr> 
                                        <td>Gender</td>
                                        <td>${pokemon.gender}</td>
                                    </tr>
                                    <tr> 
                                        <td>Egg Groups</td>
                                        <td>${pokemon.eggGroups.slice().join(", ")}</td>
                                    </tr>
                                    <tr> 
                                        <td>Egg Cycle</td>
                                        <td>${pokemon.eggCycle}</td>
                                    </tr>
                                </tbody>
                            </table>
                </div>
                <div id="baseStatsTable" class="detail" style="display: none;" >
                            <table>
                                <tbody>
                                    <tr> 
                                        <td>HP</td>
                                        <td>${pokemon.baseStats.hp}</td>
                                        <td> <progress max="255" value="${pokemon.baseStats.hp}"> </progress> </td>
                                    </tr> 
                                    <tr> 
                                        <td>Attack</td>
                                        <td>${pokemon.baseStats.attack}</td>
                                        <td> <progress max="255" value="${pokemon.baseStats.attack}"> </progress> </td>
                                    </tr> 
                                    <tr> 
                                        <td>Defense</td>
                                        <td>${pokemon.baseStats.defense}</td>
                                        <td> <progress max="255" value="${pokemon.baseStats.defense}"> </progress> </td>
                                    </tr> 
                                    <tr> 
                                        <td>SP. Atk</td>
                                        <td>${pokemon.baseStats.specialAttack}</td>
                                        <td> <progress max="255" value="${pokemon.baseStats.specialAttack}"> </progress> </td>
                                    </tr> 
                                    <tr> 
                                        <td>Sp. Def</td>
                                        <td>${pokemon.baseStats.specialDefense}</td>
                                        <td> <progress max="255" value="${pokemon.baseStats.specialDefense}"> </progress> </td>
                                    </tr> 
                                    <tr> 
                                        <td>Speed</td>
                                        <td>${pokemon.baseStats.speed}</td>
                                        <td> <progress max="255" value="${pokemon.baseStats.speed}"> </progress> </td>
                                    </tr> 
                                    <tr> 
                                        <td>Total</td>
                                        <td>${pokemon.baseStats.total}</td>
                                        <td> <progress max="600" value="${pokemon.baseStats.total}"> </progress> </td>
                                    </tr> 
                                </tbody>
                            </table>
                        
                </div>
            </div>
        </div>
    `
}


loadDetalhe() 

function loadDetalhe(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var pokeNumero = url.searchParams.get("poke")

    const urlDetalhePokemon = 'https://pokeapi.co/api/v2/pokemon/'+pokeNumero+'/';
    fetch(urlDetalhePokemon)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .then((poke = []) => {
            const htmlDetalhePokemon = montarHtmlDetalhePokemon(poke);
            console.log(poke);
            const pokemonDetalhe = document.getElementById('detalhe-pokemon');
            pokemonDetalhe.className = `pokemon-detail ${poke.type}`
            pokemonDetalhe.innerHTML = htmlDetalhePokemon;
    });
}

function clickMenu(idClass){

    const menuBase = document.getElementById('baseStatsTable');
    const menuAbout = document.getElementById('aboutTable');
    const baseLink = document.getElementById('base-link');
    const aboutLink = document.getElementById('about-link');

    
    if(idClass == 'baseStatsTable'){
        menuBase.style.display = "block";
        menuAbout.style.display = "none";
        baseLink.className = "active";
        aboutLink.className = "";
    } else if(idClass == 'aboutTable'){
        menuBase.style.display = "none";
        menuAbout.style.display = "block";
        baseLink.className = "";
        aboutLink.className = "active";
    }

    
}




