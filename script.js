document.addEventListener('DOMContentLoaded', () => {
    cargarListaPokemons('pokemon1');
    cargarListaPokemons('pokemon2');
});

function cargarListaPokemons(selectId) {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById(selectId);
            data.results.forEach(pokemon => {
                const option = document.createElement('option');
                option.value = pokemon.url;
                option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar la lista de Pokémon:', error));
}

function cargarPokemon(selectId, cardId) {
    const selectElement = document.getElementById(selectId);
    const pokemonUrl = selectElement.value;
    const cardElement = document.getElementById(cardId);

    if (!pokemonUrl) {
        cardElement.innerHTML = '';
        return;
    }

    fetch(pokemonUrl)
        .then(response => response.json())
        .then(pokemon => {
            cardElement.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <p>Altura: ${(pokemon.height / 10).toFixed(1)} m</p>
                <p>Peso: ${(pokemon.weight / 10).toFixed(1)} kg</p>
                <p>Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            `;
        })
        .catch(error => console.error('Error al cargar los datos del Pokémon:', error));
}

function playSound() {
    document.getElementById('clickSound').play();
}
