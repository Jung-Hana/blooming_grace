const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock_list', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    stock_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stock_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stock_list',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "stock_list_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
