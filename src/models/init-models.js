var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _investment_detail = require("./investment_detail");
var _investment_info = require("./investment_info");
var _stock_list = require("./stock_list");
var _user_info = require("./user_info");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var investment_detail = _investment_detail(sequelize, DataTypes);
  var investment_info = _investment_info(sequelize, DataTypes);
  var stock_list = _stock_list(sequelize, DataTypes);
  var user_info = _user_info(sequelize, DataTypes);


  return {
    SequelizeMeta,
    investment_detail,
    investment_info,
    stock_list,
    user_info,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
