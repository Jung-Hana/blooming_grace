const InvestService = require("../services/investService");
const spawn = require("child_process").spawn;
const iconv = require("iconv-lite");
const UtilCurrentCost = require("../utils/getCurrentCost.js");
const utilMakeInvestId = require("../utils/makeInvestId");
exports.Investment = {
  //user_id에 따른 결과 조회
  getByUserId: async (req, res) => {
    try {
      if (req.params.user_id) {
        const user_id = req.params.user_id;
        console.log(user_id);
        const investmentByUserId =
          await InvestService.Investment.selectByUserId(user_id);

        // .then((result) => { return res.status(200).json({ 'vision_result': result }) })
        // .catch(err => { return res.status(400).send('Bad Request'); })

        if (investmentByUserId != -1) {
          return res.status(200).json({
            investment: investmentByUserId,
          });
        } else {
          return res.status(404).json("Not Found");
        }
      } else {
        return res.status(400).send("Bad Request");
      }
    } catch (err) {
      //서버 오류
      console.log(err);
      return res.status(500).send("Internal Server Error occured");
    }
  },

  //check_id에 따른 결과 조회
  getByInvestId: async (req, res) => {
    try {
      if (req.params.invest_id && req.params.user_id) {
        const invest_id = req.params.invest_id;
        const user_id = req.params.user_id;

        let finalResult = new Array();
        var investDetailResult =
          await InvestService.Investment.selectByInvestId(user_id, invest_id);

        const investDetailResult_length =
          Object.keys(investDetailResult).length;
        // console.log("investDetailResult", investDetailResult[0]["title"]);
        for (let i = 0; i < investDetailResult_length; i++) {
          var jsonObj = new Object();
          let myStockCode = investDetailResult[i]["stock"];
          const stockName = await InvestService.Investment.selectStockCode(
            myStockCode
          );
          console.log(stockName[0]["stock_name"]);
          let myStockCost = investDetailResult[i]["buy"];
          let myStockQnt = investDetailResult[i]["quantity"];
          //수익률
          var process = spawn("python", [
            "C:/Users/hana0/workplace/bloomingGrace_backend_assignment/src/utils/getCurrentCost.py",
            myStockCode,
            myStockCost,
          ]);
          // console.log(process);
          // console.log("service");

          await process.stdout.on("data", (err, result) => {
            const stdoutData = result;
            return stdoutData;
            console.log(stdoutData);
          });
          // console.log("globalobj", globalobj);
          jsonObj.title = investDetailResult[i]["title"];
          jsonObj.contents = investDetailResult[i]["contents"];
          jsonObj.stock = investDetailResult[i]["stock"];
          let buy = investDetailResult[i]["buy"];
          buy = parseInt(buy);
          let quantity = investDetailResult[i]["quantity"];
          quantity = parseInt(quantity);
          let totalCost = buy * quantity;

          // let totalCost = investDetailResult[i]["buy"]
          jsonObj.totalCost = totalCost;
          // jsonObj.curretnCost = globalobj[0];
          jsonObj = JSON.stringify(jsonObj);
          //String 형태로 파싱한 객체를 다시 json으로 변환
          finalResult.push(JSON.parse(jsonObj));
          console.log(finalResult);
        }
        //투자종목&매수가

        // const serviceResult = await UtilCurrentCost(myStockCode, myStockCost);
        // console.log("retire", serviceResult);

        if (investDetailResult != -1) {
          return res.status(200).json({
            investment_detail_result: finalResult,
          });
        } else {
          return res.status(404).json("Not Found");
        }
      } else {
        return res.status(400).json("Bad Request");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json("Internal Server Error Occured");
    }
  },

  postStock: async (req, res) => {
    try {
      if (req.params.user_id) {
        const user_id = req.params.user_id;
        const stock_array = req.body;

        let postStockResut = await InvestService.Investment.insertInvest(
          user_id,
          stock_array
        );

        if (postStockResut != -1) {
          return res.status(200).json("success");
        } else {
          return res.status(400).json("fail");
        }
      } else {
        return res.status(404).json("Do not found");
      }
    } catch (err) {
      return res.status(500).json("server error");
    }
  },
  getStockList: async (req, res) => {
    try {
      const stockList = await InvestService.Investment.selectStockList();
      console.log(stockList);
      if (stockList != -1) {
        return res.status(200).json({
          stockList: stockList,
        });
      } else {
        return res.status(404).json("Not Found");
      }
    } catch (err) {
      //서버 오류
      console.log(err);
      return res.status(500).send("Internal Server Error occured");
    }
  },
};
