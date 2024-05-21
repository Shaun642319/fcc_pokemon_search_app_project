const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const typesDiv = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const avatarDiv = document.getElementById("avatar");

const clearDisplay = () => {
	pokemonName.textContent = "";
	pokemonId.textContent = "";
	weight.textContent = "";
	height.textContent = "";
	hp.textContent = "";
	attack.textContent = "";
	defense.textContent = "";
	specialAttack.textContent = "";
	specialDefense.textContent = "";
	speed.textContent = "";
	avatarDiv.innerHTML = "";
	typesDiv.innerHTML = "";
};

const typeDiv = typeVal => {
	for (let i=0; i < typeVal.length; i++) {
		typesDiv.innerHTML += `<div class="type ${typeVal[i].type.name}">${typeVal[i].type.name}</div>`
	}
};

const updateDisplay = (heightVal, id, name, sprites, stats, types, weightVal) => {
	clearDisplay();

	pokemonName.textContent = name.toUpperCase();
	pokemonId.textContent = `#${id}`;
	height.textContent = `height: ${heightVal}`;
	weight.textContent = `weight: ${weightVal}`;
	avatarDiv.innerHTML += `<img id="sprite" src="${sprites.front_default}" alt="${name}_pic" />`;

	hp.textContent = stats[0].base_stat;
	attack.textContent = stats[1].base_stat;
	defense.textContent = stats[2].base_stat;
	specialAttack.textContent = stats[3].base_stat;
	specialDefense.textContent = stats[4].base_stat;
	speed.textContent = stats[5].base_stat;

	typeDiv(types);
};

const pokemonSearch = nameValue => {
	const pokemon = () => {
		if (!isNaN(nameValue)) {
			return nameValue;
		} else {
			nameValue = nameValue.replace(" ", "-").replace("♂", "-m").replace("♀", "-f").replace(/[^-\w\s]/gi, '').toLowerCase();
			return nameValue;
		}
	};
  const apiCall = async () => {
    try{
      const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon()}`);
      const json = await res.json();
			const { height, id, name, sprites, stats, types, weight } = json;
			updateDisplay(height, id, name, sprites, stats, types, weight);
  } catch (err) {
    alert("Pokémon not found");
    };
  };
	apiCall()
};

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    pokemonSearch(searchInput.value);
		searchInput.value = "";
  };
});

searchBtn.addEventListener("click", () => {
  pokemonSearch(searchInput.value);
	searchInput.value = "";
});
