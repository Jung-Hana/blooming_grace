const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('investment_info', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    invest_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stock: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    buy: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'investment_info',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "investment_info_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "invest_id" },
        ]
      },
    ]
  });
};
