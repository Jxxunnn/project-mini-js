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
  // 구조분해할당을 배열 메소드에서? 개신기
  return data.filter(({ city, state }) => city.match(re) || state.match(re));
};
const highlight = (keyword, content, element) => {
  const re = new RegExp(`${keyword}`, "gi");
  // 아 씨 innerHTML 쓰기 싫었는데
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
  // 구조분해할당 개꿀
  for (const { city, population, state } of filtered) {
    const $li = document.createElement("li");
    const $leftSpan = document.createElement("span");
    const $rightSpan = document.createElement("span");
    $leftSpan.textContent = `${city}, ${state}`;
    highlight(keyword, $leftSpan.textContent, $leftSpan);
    $rightSpan.textContent = "";
    // 컨트롤 d 메모
    if (population.length > 3) $rightSpan.textContent = addComma(population);
    else $rightSpan.textContent = population;
    $li.appendChild($leftSpan);
    $li.appendChild($rightSpan);
    $suggestions.insertAdjacentElement("beforeend", $li);
  }
};

$searchInput.addEventListener("input", paintList);
