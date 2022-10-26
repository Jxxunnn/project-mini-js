const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const data = await fetch(endpoint).then((res) => res.json());
const $searchForm = document.querySelector(".search-form");
const $searchInput = document.querySelector(".search");
const findList = (keyword) => {
  const re = new RegExp(`${keyword}`, "gi");
  return data.filter((v) => v.city.match(re) || v.state.match(re));
};

const paintList = (e) => {
  const keyword = e.target.value;
  const filtered = findList(keyword);
  for (const list of filtered) {
    const $li = document.createElement("li");
    const $leftSpan = document.createElement("span");
    const $rightSpan = document.createElement("span");
    $leftSpan.textContent = `${list.city}, ${list.state}`;
    //  $rightSpan.textContent =
  }
  console.log(data[9]);
};

$searchInput.addEventListener("input", paintList);

//지금 이미 인구순으로 되어있어.
//지금 필요한 게 city랑 population이랑 state
//입력 값을 받으면 list 초기화한 다음에 필터링된 녀석들 인구순으로 주르루룩
