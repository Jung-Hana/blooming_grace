const db = require("../config/pgsql");

exports.User = {
  /**
   * select user by user_id
   *
   * @param {String} user_id
   * @return {Number} returnResult
   */
  selectUserId: async (user_id) => {
    let returnResult = -2;

    try {
      let client = await db.getConnection();
      const select_query = `SELECT * FROM user_info WHERE user_id = $1;`;
      const result = await client.query(select_query, [user_id]);
      if (result.rows.length == 1) {
        returnResult = 1;
        return returnResult;
      }
      returnResult = -1;
      return returnResult;
    } catch (err) {
      returnResult = -1;
      return returnResult;
    }
  },
  /**
   * select user by user_id
   * return user's password
   *
   * @param {String} user_id
   * @return {Text} returnPassword
   */
  selectPassword: async (user_id) => {
    try {
      let client = await db.getConnection();
      let returnPassword;
      const select_query = `SELECT * FROM user_info WHERE user_id = $1;`;
      const result = await client.query(select_query, [user_id]);
      console.log(result.rows);
      if (result < 1) {
        throw new Error("Post with this id was not found");
      }
      returnPassword = result.rows[0]["password"];
      return returnPassword;
      // return result.rows[0]["password"];
    } catch (err) {
      returnPassword = -1;
      return returnPassword;
    }
  },

  /**
   * insert user
   *
   * @param {String} user_id
   * @param {TEXT} passhash
   * @return {Number} returnResult
   */
  insertUser: async (user_id, passHash) => {
    try {
      client = await db.getConnection();
      let returnResult = -2;
      const insert_query =
        "INSERT INTO user_info(user_id, password) VALUES ($1, $2);";
      const insertResult = await client.query(
        insert_query,
        [user_id, passHash],
        (err, results) => {
          if (err) {
            console.log(err);
            returnResult = -1;
            return returnResult;
          }
          console.log(results);
          returnResult = 1;
          return returnResult;
        }
      );
    } catch (err) {
      console.log(err);
      returnResult = -1;
      return returnResult;
    } finally {
      if (client) db.closeConnection(client);
    }
  },

  /**
   * update user's token
   *
   * @param {String} user_id
   * @param {TEXT} token
   * @return {Number} returnResult
   */
  updateToken: async (user_id, token) => {
    try {
      client = await db.getConnection();
      const update_query = "UPDATE user_info SET token = $1 WHERE user_id = $2";
      console.log("insert");
      await client.query(update_query, [token, user_id], (err, results) => {
        if (err) {
          console.log(err);
          return -1;
        } else {
          return 1;
        }
      });
    } catch (err) {
      console.log(err);
      return -1;
    } finally {
      if (client) db.closeConnection(client); // 클라이언트를 한 번만 반환
    }
  },
};
