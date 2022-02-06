import { Service } from "typedi"
import RecordEntity from "../../entity/record-entity"
import { ExchangeInterfaceToken } from "../../tokens"
import { ExchangeInterface } from "../../types/interfaces"
import * as XLSX from "xlsx"
import moment = require("moment-timezone")

@Service({ id: ExchangeInterfaceToken, multiple: true })
export default class ProbitExchange implements ExchangeInterface {
  id(): string {
    return "probit"
  }

  async importFile(path: string): Promise<RecordEntity[]> {
    let importType: 'TRADE'|'TRANSFER'
    if(path.indexOf('trade') !== -1) {
      importType = "TRADE"
    } else if(path.indexOf('transfer') !== -1) {
      importType = "TRANSFER"
    } else {
      throw new Error('Import file type is not recognized')
    }

    let records: RecordEntity[] = []

    const wb = XLSX.readFile(path, { type: "binary", raw: true })
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1, raw: true })

    for (let i = 1; i < data.length; i++) {
      const row = data[i]
      const address = "my-probit"
      if(importType === "TRANSFER") {
        const date = moment(row[0], "YYYY-MM-DD HH:mm:ss").toDate()
        const currency = row[3]
        const amount = row[5]
        const feeAmount = row[9]
        const feeCurrency = row[10]
  
        let record = new RecordEntity()
        record.date = date
        record.address = address
        record.currency = currency
        switch(row[2]) {
          case "withdrawal":
            record.type = "WITHDRAW"
            record.amount = amount
            break
          case "deposit":
            record.type = "DEPOSIT"
            record.amount = amount
            break
        }
        records.push(record)

        let feeRecord = new RecordEntity()
        feeRecord.date = date
        feeRecord.address = address
        feeRecord.currency = feeCurrency
        feeRecord.type = "FEE"
        feeRecord.amount = feeAmount
        if(feeRecord.amount > 0) {
          records.push(feeRecord)
        }
      } else if(importType === "TRADE") {
        const date = moment(row[0], "YYYY-MM-DD HH:mm:ss").toDate()
        const market = row[2]
        const side = row[4]
        const status = row[10]
        if(side === "buy" && status === "settled") {
          const buyCurrency = market.split('-')[0]
          const sellCurrency = market.split('-')[1]
          
          let swapBuyRecord = new RecordEntity()
          swapBuyRecord.date = date
          swapBuyRecord.address = address
          swapBuyRecord.currency = buyCurrency
          swapBuyRecord.type = "SWAP_BUY"
          swapBuyRecord.amount = row[6]
          records.push(swapBuyRecord)

          let swapSellRecord = new RecordEntity()
          swapSellRecord.date = date
          swapSellRecord.address = address
          swapSellRecord.currency = sellCurrency
          swapSellRecord.type = "SWAP_SELL"
          swapSellRecord.amount = row[7]
          records.push(swapSellRecord)

          const feeAmount = row[9]
          const feeCurrency = row[8]
          let feeRecord = new RecordEntity()
          feeRecord.date = date
          feeRecord.address = address
          feeRecord.currency = feeCurrency
          feeRecord.type = "FEE"
          feeRecord.amount = feeAmount
          records.push(feeRecord)
        }
      }
    }

    return records
  }
}
