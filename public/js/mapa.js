/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// todo apunta a la vista donde está instanciado el script del mapa\n// views/realState/add-property.pug -> script(src=\"/js/mapa.js\")\n\nconst setFieldsInAddPropertyView = (position, address) => {\n  const street = document.getElementById(\"street\");\n  const streetInput = document.getElementById(\"streetInp\");\n  const latInput = document.getElementById(\"lat\");\n  const logInput = document.getElementById(\"lng\");\n  street.textContent = address ?? \"\"; // optional chaining\n  latInput.value = position.lat;\n  logInput.value = position.lng;\n  streetInput.value = address;\n};\n\nconst geoCodeService = (position, marker) => {\n  const geocodeService = L.esri.Geocoding.geocodeService();\n  geocodeService\n    .reverse()\n    .latlng(position, 10, (error, result) => {})\n    .run((error, result) => {\n      // mostrar popup con la dirección en el pin\n      const address = result.address.LongLabel;\n      marker.bindPopup(address);\n      setFieldsInAddPropertyView(position, address);\n    });\n};\n\n(function () {\n  const latInput = document.getElementById(\"lat\").value;\n  const logInput = document.getElementById(\"lng\").value;\n\n  // posición inicial del mapa\n  console.log(\"data from add-property.pug\")\n  console.log({ latInput, logInput });\n  const lat = latInput || 4.8053662;\n  const lng = logInput || -75.6957376;\n  const mapa = L.map(\"mapa\").setView([lat, lng], 10);\n\n  let marker;\n\n  L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n    attribution:\n      '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n  }).addTo(mapa);\n  // el mapa se añade al div con el id mapa en views/realState/add-property.pug\n\n  // pin que se mueve a través del mapa y se puede arrastrar ( el mapa se mueve con el pin)\n  marker = new L.marker([lat, lng], { draggable: true, autoPan: true }).addTo(\n    mapa\n  );\n\n  // detectar el movimiento del pin\n  marker.on(\"moveend\", (ev) => {\n    marker = ev.target;\n    const position = marker.getLatLng();\n    const { lat, lng } = position;\n    mapa.panTo(new L.LatLng(lat, lng)); // centrar mapa en la posición del pin\n    // obtener info de las calles cuando se suelte el pin\n    geoCodeService(position, marker);\n  });\n})();\n\n\n//# sourceURL=webpack://01-bienes-raices/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;