Cómo insertar un mapa en mi aplicación 
    librerias de mapas: leaflet
    dependencias: webpack -> compila archivos estaticos 
        - entry. archivos sin compilar -> carpeta: src/js
        - output. archivos compilados -> carpeta: public/js

-----------------------------------------------------------
Paso 1. 
    archivo: views/realState/add-property.pug

    block scripts 
        script(src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js")
        script(src="https://unpkg.com/esri-leaflet@3.0.8/dist/esri-leaflet.js")
        script(src="https://unpkg.com/esri-leaflet-geocoder@2.2.13/dist/esri-leaflet-geocoder.js")
        script(src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-geosearch/2.7.0/bundle.min.js")
        //- mapa compilado por webpack
        script(src="/js/mapa.js")
-----------------------------------------------------------
Paso 2. 
    crear archivo. webpack.config.js en la raiz del proyecto y agregar configuración:
    ------------------------
    import path from "path";

    export default {
    mode: "development",
    entry: {
        mapa: "./src/js/map.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public/js"),
    },
    };
    ------------------------

-----------------------------------------------------------
Paso 3. Agregar script package.json que ejecute el webpack cada vez que hayan cambios 
    forma 1. 
         { ... "js": "webpack --watch" ...}
    forma 2. instalar npm i -D concurrently
         {"run:with:concurrently": "concurrently \"npm run dev\" \"npm run css\" \"npm run js\"",}

-----------------------------------------------------------
Paso 4. 
    en views/layout/index.pug agregar: block styles en el head 

    ------------------------
    ...
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Bienes Raices | #{view}
        link(rel="stylesheet", href="/css/app.css")
        block styles
    body.min-h-screen.bg-gray-50 
    ...
    ------------------------

    en views/realState/add-property.pug agregar el div que va a contener el mapa 
        ...
        div(id="mapa" class="h-96")
        ...
-----------------------------------------------------------
Paso 5. configurar mapa en: src/js/map.js




Recursos 
    librerias de mapas: leaflet
        require instalación de dependencias: NO (solo agregar los scripts)
    dependencia para compilar archivos estaticos: webpack
        requiere instalación de dependencias: SI -> npm i -D webpack webpack-cli


