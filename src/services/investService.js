// exports.CheckInfo = {
//   /**
//    * 검사 정보 insert
//    *
//    * @param {String} check_category
//    * @param {String} check_id
//    * @param {String} user_id
//    * @return {Number} isExistedResult
//   */
//   insertCheckResult: async (check_category, check_id, user_id) => {
//       let isExistedResult = -2;
//       const created_date = Date.now();

//       try {
//           const createCheckInfo = await Check_info.create({
//               user_id: user_id,
//               check_id: check_id,
//               created_date: created_date,
//               check_category: check_category
//           }).then((result) => {
//               isExistedResult = 0;
//               return isExistedResult;
//           }).catch((err) => {
//               isExistedResult = -1;
//               console.log(err);
//               return isExistedResult;
//           });

//       } catch (err) {
//           return_result = -1;
//           console.log(err);
//           return return_result;
//       }
//   }
// }

const db = require("../config/pgsql");
const utilMakeInvestId = require("../utils/makeInvestId");

/**
 * @class Investment
 * @todo About Investment Module
 */
exports.Investment = {
  /**
   * 투자 일지 by user_id
   *
   * @param {String} user_id
   * @return {Number} isExistedResult
   */
  selectByUserId: async (user_id) => {
    let select_query = 'select * from "investment_info" WHERE user_id = $1';
    let returnResult;

    try {
      client = await db.getConnection();
      let result = await client.query(select_query, [user_id]);
      returnResult = result.rows;
      console.log(returnResult);
      return returnResult;
    } catch (err) {
      console.error(err);
      returnResult = -1;
    } finally {
      if (client) db.closeConnection(client);
    }
  },

  /**
   * 투자 상세 일지
   *
   * @param {String} user_id
   * @param {String} invest_id
   * @return {Number} isExistedResult
   */
  selectByInvestId: async (user_id, invest_id) => {
    try {
      let return_result;
      client = await db.getConnection();
      const select_query =
        'select * from "investment_info" WHERE user_id = $1 and invest_id = $2';
      const result = await client.query(select_query, [user_id, invest_id]);
      return_result = result.rows;
      // console.log(return_result, ";return_result");

      if (return_result < 1) {
        return_result = -1;
      }
      return return_result;
    } catch (err) {
      return_result = -1;
      return return_result;
    } finally {
      if (client) db.closeConnection(client);
    }
  },

  /**
   * 검사 정보 insert
   */
  insertInvest: async (user_id, stock_array) => {
    let isExistedResult = -2;

    try {
      console.log(stock_array);
      client = await db.getConnection();

      const stock_array_length = Object.keys(stock_array).length;
      const stockArray = stock_array["stock_array"];
      // const invest_id = await utilMakeInvestId.makeInvestId(user_id);
      // let insert_query = `INSERT INTO investment_info values (invest_id,user_id, title, contents, stock, buy, quantity) VALUES ('${invest_id[i]}', '${user_id[i]}','${title[i]}', '${contents[i]}','${stock[i]}', '${buy[i]}','${quantity[i]}')`;
      for (let i = 0; i < stock_array_length; i++) {
        // console.log(invest_id);
        // const user_id = await stockArray[i]["user_id"];
        const invest_id2 = await utilMakeInvestId.makeInvestId(user_id);
        console.log(invest_id2);
        const insert_query = `INSERT INTO investment_info(invest_id, user_id, title, contents, stock, buy, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
        let result = await client.query(
          insert_query,
          [
            invest_id2,
            user_id,
            stockArray[i]["title"],
            stockArray[i]["contents"],
            stockArray[i]["stock"],
            stockArray[i]["buy"],
            stockArray[i]["quantity"],
          ],
          (err, results) => {
            console.log(results);
            if (err) {
              console.log(err);
              return -1;
            }
            return 1;
          }
        );
      }
    } catch (err) {
      return -1;
    } finally {
      if (client) db.closeConnection(client); // 클라이언트를 한 번만 반환
    }
  },

  selectStockList: async () => {
    try {
      client = await db.getConnection();
      const result = await client.query("select * from stock_list;");
      console.log(result.rows);
      if (result < 1) {
        throw new Error("Post with this id was not found");
      }
      return result.rows;
    } catch (err) {
      return -1;
    } finally {
      if (client) db.closeConnection(client); // 클라이언트를 한 번만 반환
    }
  },
  /**
   * stock_name by stock_code
   *
   * @param {String} myStockCode
   * @return {String} returnResult
   */
  selectStockCode: async (myStockCode) => {
    try {
      client = await db.getConnection();
      let returnResult;
      let select_query = "select * from stock_list where stock_code = $1;";
      const result = await client.query(select_query, [myStockCode]);
      returnResult = result.rows;
      // console.log(result.rows["stock_name"]);
      if (result < 1) {
        throw new Error("Post with this id was not found");
        returnResult = -1;
        return returnResult;
      }
      return returnResult;
    } catch (err) {
      returnResult = -1;
      return returnResult;
    } finally {
      if (client) db.closeConnection(client);
    }
  },
};
