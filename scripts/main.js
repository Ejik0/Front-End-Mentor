const ipInput = document.getElementById("ipInput");
const ipSearch = document.getElementById("ipSearch");
const resultIp = document.getElementById("resultIp");
const resultLocation = document.getElementById("resultLocation");
const resultTime = document.getElementById("resultTime");
const resultIsp = document.getElementById("resultIsp");
let mymap = L.map("mapid").setView([51.505, -0.09], 3);
let myIcon = L.icon({
  iconUrl: "/css/img/icon-location.svg",
  iconSize: [23, 23],
  iconAnchor: [25, 16],
});
let marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);

ipSearch.addEventListener("click", function (e) {
  fetch(
    "https://geo.ipify.org/api/v1?apiKey=at_8aBMsYotJm2S1ncqGsQoc7lTQH1RK&ipAddress=" +
      ipInput.value
  )
    .then((response) => response.json())
    .then(function retrive(data) {
      resultIp.innerText = data.ip;
      resultLocation.innerText =
        data.location.city +
        ", " +
        data.location.country +
        " " +
        data.location.geonameId;

      resultTime.innerText = "UTC " + data.location.timezone;
      resultIsp.innerText = data.as.name;
      marker.setLatLng([data.location.lat, data.location.lng]);
      mymap.setView([data.location.lat, data.location.lng], 15);
    });
});

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(mymap);

L.marker;
