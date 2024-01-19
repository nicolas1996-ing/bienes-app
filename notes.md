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
    