const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  port: "5432",
  user: "postgres",
  password: "hana",
  database: "db",
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  max: 20, // 최대 클라이언트 수
  idleTimeoutMillis: 30000, // 사용되지 않는 연결을 풀에서 제거하는 시간 (ms)
  connectionTimeoutMillis: 2000, // 연결을 생성하는 데 걸리는 최대 시간 (ms)
});

// 연결을 가져오기 위한 함수
const getConnection = async () => {
  try {
    const client = await pool.connect(); // 풀에서 연결을 가져옴
    console.log("Database connected successfully");
    return client;
  } catch (err) {
    console.error("Database connection error:", err.stack);
    throw err;
  }
};

// 연결을 반납하는 함수
const closeConnection = (client) => {
  try {
    client.release(); // 연결을 풀에 반납
    console.log("Database connection released back to pool");
  } catch (err) {
    console.error("Error releasing database connection:", err.stack);
  }
};

module.exports = {
  getConnection,
  closeConnection,
};
