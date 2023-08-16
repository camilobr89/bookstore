const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      status: {
        type: DataTypes.ENUM("Abierto", "Procesando", "Entregado"),
        allowNull: false,
        defaultValue: "Abierto"
      },
      // books: {
      // 	type: DataTypes.ARRAY(DataTypes.STRING)
      // }
    },
    {
      timestamps: false,
    }
  );
};