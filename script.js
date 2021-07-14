var mymap = L.map("mapid").setView([-37.8136, 144.9631], 13);

googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    minZoom: 2,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
).addTo(mymap);
