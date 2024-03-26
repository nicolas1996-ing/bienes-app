import Unit from "./Unit.js";
import Users from "./Users.js";
import Category from "./Category.js";
import Price from "./Price.js";

// relaciones

// propiedad -> precio -> 1:1
// crea la relación automaticamente en la tabla de unit -> price_id (FK)
// Price.hasOne(Unit);
Unit.belongsTo(Price);
Unit.belongsTo(Category);
Unit.belongsTo(Users);

export { Unit, Users, Category, Price };
