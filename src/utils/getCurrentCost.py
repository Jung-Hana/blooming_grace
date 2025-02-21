import sys
from pykrx import stock
import datetime
import json

def stockCurrent(myStockCode,myStockCost):
    today = datetime.datetime.today()
    df = stock.get_market_ohlcv(today,today,myStockCode)
    nowCost = json.loads(df.to_json(orient='records'))
    if df.empty:
        returnResult = 0
        return returnResult
    # print(now)
    print(nowCost[0]['시가'])
    nowCost = nowCost[0]['시가']
    nowCost = int(nowCost)
    myStockCost = int(myStockCost)
    returnRate = ((nowCost - myStockCost)/myStockCost)-1
    print(returnRate)
    return returnRate

if __name__ == '__main__':
    stockCurrent(sys.argv[1],sys.argv[2])
