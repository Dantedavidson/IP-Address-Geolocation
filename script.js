import TOKEN from "config.js";

const blackIcon = new L.Icon({
  iconUrl: "./images/icon-location.svg",
});

const input = document.querySelector(".form__input");
const button = document.querySelector(".form__button");
const displayIp = document.querySelector(".ip p");
const displayLocation = document.querySelector(".location p");
const displayTimezone = document.querySelector(".timezone p");
const displayIsp = document.querySelector(".isp p");
console.log(displayIp, displayIsp, displayLocation, displayTimezone);

const createQuery = () => {
  let query = `https://geo.ipify.org/api/v1?apiKey=${TOKEN}`;
  let letters = /^[A-Za-z]+$/;
  if (input.value) {
    if (input.value.match(letters)) {
      query = `${query}&domain=${input.value}`;
    } else {
      query = `${query}&ipAddress=${input.value}`;
    }
  }
  return query;
};

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateMap = (map, lat, lng) => {
  map.setView([lat, lng], 16);
  L.marker([lat, lng], { icon: blackIcon }).addTo(map);
};

const updateDOM = (ip, location, timezone, isp) => {
  displayIp.innerText = ip;
  displayLocation.innerText = location;
  displayTimezone.innerText = timezone;
  displayIsp.innerText = isp;
};

button.addEventListener("click", async () => {
  const data = await fetchData(createQuery());
  updateMap(map.map, data.location.lat, data.location.lng);
  updateDOM(
    data.ip,
    `${data.location.city}, ${data.location.region}, ${data.location.postalCode}`,
    `UTC${data.location.timezone}`,
    data.isp
  );
  console.log(data);
});

class Map {
  initialize() {
    this.map = L.map("mapid").setView([-37.8136, 144.9631], 13);
    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      minZoom: 2,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(this.map);
    L.marker([-37.8136, 144.9631], {
      icon: blackIcon,
    }).addTo(this.map);
  }
}

const map = new Map();
map.initialize();
