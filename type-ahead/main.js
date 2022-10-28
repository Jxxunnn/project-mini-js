const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const data = await fetch(endpoint).then((res) => res.json());
const $searchForm = document.querySelector(".search-form");
const $searchInput = document.querySelector(".search");
const $suggestions = document.querySelector(".suggestions");
const initialLi = $suggestions.textContent.trim().split("\n");
const initList = () => {
  for (const text of initialLi) {
    const $li = document.createElement("li");
    $li.textContent = text.trim();
    $suggestions.appendChild($li);
  }
};
const findList = (keyword) => {
  const re = new RegExp(`${keyword}`, "gi");
  return data.filter((v) => v.city.match(re) || v.state.match(re));
};
const highlight = (keyword, content, element) => {
  const re = new RegExp(`${keyword}`, "gi");
  if (re.test(content)) {
    element.innerHTML = content.replaceAll(re, `<mark>${keyword}</mark>`);
  }
};
const addComma = (string) => {
  const arr = string.split("");
  arr.splice(-3, 0, ",");
  let n = 6;
  while (string.length > n) {
    arr.splice(-n - 1, 0, ",");
    n += 3;
  }
  return arr.join("");
};

const paintList = (e) => {
  const keyword = e.target.value;
  $suggestions.textContent = "";
  if (!e.target.value) {
    initList();
    return;
  }
  const filtered = findList(keyword);
  for (const list of filtered) {
    const $li = document.createElement("li");
    const $leftSpan = document.createElement("span");
    const $rightSpan = document.createElement("span");
    $leftSpan.textContent = `${list.city}, ${list.state}`;
    highlight(keyword, $leftSpan.textContent, $leftSpan);
    $rightSpan.textContent = "";
    if (list.population.length > 3)
      $rightSpan.textContent = addComma(list.population);
    else $rightSpan.textContent = list.population;
    $li.appendChild($leftSpan);
    $li.appendChild($rightSpan);
    $suggestions.insertAdjacentElement("beforeend", $li);
  }
};

$searchInput.addEventListener("input", paintList);
