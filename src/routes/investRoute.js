const express = require("express");
const router = express.Router();
const InvestmentController = require("../controllers/investController");

//사용자별 투자내역 조회
router.get("/investment/:user_id", InvestmentController.Investment.getByUserId);
//사용자별 투자상세내역 조회
router.get(
  "/investment/:user_id/:invest_id",
  InvestmentController.Investment.getByInvestId
);
//투자일지 입력
router.post("/investment/:user_id", InvestmentController.Investment.postStock);
//투자종목 코드 가져오기
router.get("/stock", InvestmentController.Investment.getStockList);
// router.get("/stock/:stock_code", InvestmentController.Investment.getStockCost);
module.exports = router;
// module.exports= router
// router.get('/vision/detail/:check_id', UserController.auth.check_token, ResultController.VisionCheck.resultByCheckId);
