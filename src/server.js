// src/server.js
// import http from "http";
const http = require("http");
const dotenv = require("dotenv");
// import dotenv from "dotenv";
// import app from "./app.js";
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config(); // .env 환경 변수 로드
// 미들웨어 설정
app.use(cors());
const db = require("./config/pgsql");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 라우트 설정
const investRoute = require("./routes/investRoute");
const userRoute = require("./routes/userRoute");

// 기본 라우트
// app.get("/", async (req, res) => {
//   let getSQL = 'select * from "investment_info"';
//   try {
//     client = await db.getConnection();
//     let result = await client.query(getSQL);
//     console.log(result);
//     return res.status(200).json({ result: "ok", members: result.rows });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Database operation failed" });
//   } finally {
//     if (client) db.closeConnection(client); // 클라이언트를 한 번만 반환
//   }
// });
app.use(investRoute);
app.use(userRoute);

// module.exports = app; // Express 앱 내보내기 (서버 실행 X)
// const host = "https://the-rich-coding-test1.herokuapp.com";
const PORT = process.env.PORT || 4000; // 포트 설정

// HTTP 서버 생성 및 실행
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
