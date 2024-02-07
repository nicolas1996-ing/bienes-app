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