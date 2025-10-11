const container = document.querySelector('#container');
// const lists = document.querySelector('#lists');
const pokemonCountSpan = document.querySelector('.pokemon-count');

const loader = document.createElement('span');
loader.classList.add('loading-span');
loader.textContent = 'Loading...';
loader.style.display = 'none'; // hidden by default
container.append(loader);

function showLoader() {
    container.classList.add('loading');
    loader.style.display = 'block';
}
function hideLoader() {
    container.classList.remove('loading');
    loader.style.display = 'none';
}

const createPokemon = (pokemonData = {}) => {
    const { name = '', sprites = {}, abilities = [{}] } = pokemonData;
    const div = document.createElement('div');
    div.classList.add('pokemon-details');

    const img = document.createElement('img');
    img.src = sprites?.front_default;
    img.alt = name;

    const span = document.createElement('span');
    span.textContent = name;

    const totalAbilities = abilities
        .filter((_) => _.ability.name !== '')
        .map((_) => _.ability.name)
        .join(' ');
    const abilitiesSpan = document.createElement('span');
    abilitiesSpan.textContent = `abilities: ${totalAbilities}`;

    div.append(img, span, abilitiesSpan);
    return div;
};

const getPokemons = async (offset = 0, limit = 5) => {
    try {
        showLoader();
        const data = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
        ).then((res) => res.json());

        const { count, results } = data;

        if (count) {
            hideLoader();

            pokemonCountSpan.textContent = `Total Pokemons: ${count}`;

            const pokemonUrls = [];
            results.forEach((pokemon) => {
                // const li = document.createElement('li');
                // const titleSpan = document.createElement('span');
                // titleSpan.classList.add('title-span');
                // titleSpan.textContent = pokemon?.name || '';
                // li.append(titleSpan);
                // lists.append(li);
                if (pokemon?.url) {
                    const promise = fetch(pokemon.url).then((res) =>
                        res.json()
                    );
                    pokemonUrls.push(promise);
                }
            });
            if (pokemonUrls.length) {
                const pokemons = await Promise.all(pokemonUrls);
                pokemons.forEach((pokemon) => {
                    container.append(createPokemon(pokemon));
                });

                // container.append();
            } else {
                throw new Error('No pokemons availalbe');
            }
        }
    } catch (err) {
        console.log(`Error occured ${err}`);
    }
};

getPokemons(0, 10);
