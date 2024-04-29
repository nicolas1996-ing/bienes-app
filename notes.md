Router
    urls que soporta nuestra app 
    
Model View Controller 
    Model: datos 
    View: vistas ( todo lo que el usuario puede ver ) 
    Controller: lógica. Comunica modelo y vista

ORM Object Relational Mapping 
    los datos son tratados como objetos utilizando POO 
    evita el uso de SQL puro 
    se relaciona con el MODELO ( MVC )
    metodos que facilitan el crud sobre la bd 
    medidas de seguridad para identificar sql inyection 
    INSERT INTO 'categories' ('name') VALUES ('category-name')  <=> Category.create({name: "category-name"})
Ejemplos ORM 
    - sequelice 
    - Prisma
    - Mongoose 
    - Bookshelf.js

Sequelice 
    npm i sequelize mysql2 
    https://dev.mysql.com/downloads/mysql/  => servidor 
    https://dev.mysql.com/downloads/workbench/ => interfaz grafica 
    https://sequelize.org/docs/v6/ => documentación

comandos básico terminal sql 

validaciones 
    npm i express-validator

hash passwords 
    npm i bcrypt 
    permite encriptar constraseñas como también comprobar contrseñas ingresadas por el usuario vs el hash almacenada en la bd  

envio de emails 
    nodemailer: enviar emails 
    mailtrap: probar emails - Email Delivery Platform that delivers just in time. - https://mailtrap.io/home
    npm i nodemailer

cómo funciona la confirmación de cuenta 
    1. se envia un correo al usuario al momento de crear la cuenta ( con el token incluido como un queryparam)
    2. el usuario ingresa a una vista de la app 
    3. en la vista se verifica que exista un usuario para el token 
    4. se actualiza la variable para verificar usuario a true 
    5. se le muestra una vista de confirmación al usuario 

Protección CSRF 
    - protección en los formularios
    - comprueba que los formularios no se envien desde fuentes no relacionadas con la app
    - npm i csurf cookie-parser

Recuperar password paso a paso 
    Objetivo. Re-escribir el hash de la contraseña
    cada vez que se solicita una recuperación de contraseña se genera un nuevo token 
    1. Generar token y enviar email ( la misma variable de token que es usada para confirmar el registro )
    2. El usuario ingresa a la url, se verifica el token y se hace el cambio 
    
Autenticar usuarios 
    1. Keycloak JS 
    2. Passport 
    3. jsonwebtoken
        https://jwt.io/
        npm install jsonwebtoken
        - en el jwt.payload no se guarda información sensible ya que es desencriptable 
        - header ( firma ) + payload (contenido no sensible)
    4. el token se almacena en una cookie 

mapas
    -> añadir webpack para compilar archivos estaticos
        - npm i -D webpack webpack-cli
        - archivo de configuración: webpack.config.js -> recibe archivos sin compilar, retornar archivos compilados
        - archivos sin compilar en: src/js
            - entry -> archivos sin compilar 
            - output -> archivos compilados
        - carpeta donde se guardan los archivos compilados: public/js
        - script para ejecutar los webpacks ->  { ... "js": "webpack --watch" ...}
    - clase 70-
    -> mostrar el mapa 
        link en index.pug 
        link en add-property.pug 
        agregar script de mapa en: src/js/map.js 

Ejecutar varios scripts al tiempo 
    npm i -D concurrently

Asociaciones en sequelize 
    - hasOne 1:1
        Ejemplos
          - una propiedad tiene un vendedor
          - un usuario tiene un perfil 
          - un producto tiene una categoria 
        Sintaxis 
          - Product.hasOne(Category)
            - Product tiene la fk que hace referencia al category ( Sequelize infiere esta fk en caso de no aplicarse)
    - belongsTo 1:1 
        Product.belongsTo(Category)
    - hasMany 1:N
        Ejemplos 
            - Un Product puede estar relacionado en muchas Orders
            - Un Vendedor puede tener multiples Propiedades 
            - Un elemento puede existir en muchas tablas 
            - Discount y DiscountItem 
                - Un Discount puede estar asociado a multiples (N) DiscountItem 
                - pero un DiscountItem puede estar asociado solo a un Discount
        Sintaxis 
            - Product.hasMany(Orders)
            - Author.hasMany(Post)
    - belongsToMany Muchos a muchos 
        - en este tipo de relaciones es neceario el uso de una tabla pivote 
        Ejemplos 
            - Student puede tener multiples Subjects y
            - Una Subject puede estar asociado a multiples Students 
            - Tabla pivote: fk student + fk Subject 

middleware 



Proceso conexión bd con api 
1. conexión: database/db.js
2. creación del modelo en la bd 
3. creación del modelo en api: models/Sale.js
nota. Puede crear todo el modelo en api y al lanzar servidor se creará en bd 
4. Hacer uso del modelo: models/Sale.js
ejemplo const users = await Sale.findAll(); 
aquí usamos el orm sequelize 
findAll() es una función propia del orm 

