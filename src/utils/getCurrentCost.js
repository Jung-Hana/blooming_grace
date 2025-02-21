// const spawn = require("child_process").spawn;
const iconv = require("iconv-lite");
const { spawn } = require("child_process");
/**
 * AccessToken Expired // Verify Refresh Token // Renew AccessToken
 *
 */
currentStockCost = async (myStockCode, myStockCost) => {
  let resultString = "";

  var process = spawn("python", [
    "C:/Users/hana0/workplace/bloomingGrace_backend_assignment/src/utils/getCurrentCost.py",
    myStockCode,
    myStockCost,
  ]);
  // console.log(process);
  // console.log("service");

  process.stdout.on("data", function (data) {
    const stdoutData = JSON.parse(data.toString());
    return stdoutData;
    console.log(stdoutData);
  });
  process.on("error", (err) => {
    console.error("Python 스크립트 실행 중 에러:", err);
  });
  return stdoutData;
};

module.exports = { currentStockCost };
