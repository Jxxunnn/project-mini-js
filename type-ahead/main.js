const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const data = await fetch(endpoint).then((res) => res.json());
const $searchForm = document.querySelector(".search-form");
const $searchInput = document.querySelector(".search");
const $suggestions = document.querySelector(".suggestions");
const initialLi = $suggestions.textContent.trim().split("\n");
console.log(initialLi);
const initList = () => {
  for (text of initialLi) {
    console.log(text);
    const $li = document.createElement("li");
    $li.textContent = text.trim();
    $suggestions.appendChild($li);
  }
};

const findList = (keyword) => {
  const re = new RegExp(`${keyword}`, "gi");
  return data.filter((v) => v.city.match(re) || v.state.match(re));
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
    $rightSpan.textContent =
      list.population.length > 3
        ? list.population.split("").splice(-3, 0, ",").join("")
        : list.population;
    $li.appendChild($leftSpan);
    $li.appendChild($rightSpan);
    $suggestions.insertAdjacentElement("beforeend", $li);
  }
};

$searchInput.addEventListener("input", paintList);

//지금 이미 인구순으로 되어있어.
//지금 필요한 게 city랑 population이랑 state
//입력 값을 받으면 list 초기화한 다음에 필터링된 녀석들 인구순으로 주르루룩
