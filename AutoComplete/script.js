const inputElement = document.querySelector(
  'section input[name="autocomplete-input"]'
);
const displayResultSection = document.querySelector("section.display-result");

const hideDisplaySection = () => {
  displayResultSection.style.display = "none";
  displayResultSection.innerHTML = "";
};

const generateSearchResult = (data) => {
  displayResultSection.style.display = "flex";
  data.forEach((item) => {
    const { name, id } = item;
    const span = document.createElement("span");
    span.classList.add("span-result");
    span.textContent = name;
    span.dataset.name = name;
    span.id = id;
    displayResultSection.append(span);
  });
};

const onResultSelect = (event) => {
  const targetName = event.target.dataset.name;
  const span = event.target.closest("span.span-result");
  if (!span) {
    console.log("Unable to find span tag");
    return;
  }

  inputElement.value = targetName;
  hideDisplaySection();
};

const caching = (fn) => {
  const map = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (map.has(key)) {
      return map.get(key);
    }

    const result = fn.apply(this, args);
    map.set(key, result);
    return result;
  };
};

const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const searchFunction = async (value) => {
  try {
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${value}`);
    const data = await res.json();
    if (data.recipes.length) {
      generateSearchResult(data.recipes);
    }
  } catch {
    console.log("Error while fetching", value);
  }
};

const cachedResult = caching(searchFunction);

const debouncedFn = debounce(cachedResult, 300);

function init() {
  if (!inputElement || !displayResultSection) {
    console.log("Unable to load elements");
    return;
  }
  hideDisplaySection();

  inputElement.addEventListener("input", (event) => {
    const value = event.target.value;
    debouncedFn(value);
  });

  inputElement.addEventListener("blur", hideDisplaySection);

  displayResultSection.addEventListener("click", (event) => {
    onResultSelect(event);
  });
}

init();
