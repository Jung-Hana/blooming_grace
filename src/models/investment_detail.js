const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('investment_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    invest_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    invest_item: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'investment_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "investment_detail_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
