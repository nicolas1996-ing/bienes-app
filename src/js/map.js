// todo apunta a la vista donde está instanciado el script del mapa
// views/realState/add-property.pug -> script(src="/js/mapa.js")

const setFieldsInAddPropertyView = (position, address) => {
  const street = document.getElementById("street");
  const latInput = document.getElementById("lat");
  const logInput = document.getElementById("lng");
  street.textContent = address ?? ""; // optional chaining
  latInput.value = position.lat;
  logInput.value = position.lng;
};

const geoCodeService = (position, marker) => {
  const geocodeService = L.esri.Geocoding.geocodeService();
  geocodeService
    .reverse()
    .latlng(position, 10, (error, result) => {})
    .run((error, result) => {
      // mostrar popup con la dirección en el pin
      const address = result.address.LongLabel;
      marker.bindPopup(address);
      setFieldsInAddPropertyView(position, address);
    });
};

(function () {
  const latInput = document.getElementById("lat").value;
  const logInput = document.getElementById("lng").value;

  // posición inicial del mapa
  console.log("data from add-property.pug")
  console.log({ latInput, logInput });
  const lat = latInput || 4.8053662;
  const lng = logInput || -75.6957376;
  const mapa = L.map("mapa").setView([lat, lng], 10);

  let marker;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);
  // el mapa se añade al div con el id mapa en views/realState/add-property.pug

  // pin que se mueve a través del mapa y se puede arrastrar ( el mapa se mueve con el pin)
  marker = new L.marker([lat, lng], { draggable: true, autoPan: true }).addTo(
    mapa
  );

  // detectar el movimiento del pin
  marker.on("moveend", (ev) => {
    marker = ev.target;
    const position = marker.getLatLng();
    const { lat, lng } = position;
    mapa.panTo(new L.LatLng(lat, lng)); // centrar mapa en la posición del pin
    // obtener info de las calles cuando se suelte el pin
    geoCodeService(position, marker);
  });
})();
