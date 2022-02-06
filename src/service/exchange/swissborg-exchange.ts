import { Service } from "typedi"
import RecordEntity from "../../entity/record-entity"
import { ExchangeInterfaceToken } from "../../tokens"
import { ExchangeInterface } from "../../types/interfaces"
import * as XLSX from "xlsx"
import moment = require("moment-timezone")

@Service({ id: ExchangeInterfaceToken, multiple: true })
export default class SwissbordExchange implements ExchangeInterface {
  id(): string {
    return "swissborg"
  }

  async importFile(path: string): Promise<RecordEntity[]> {
    let records: RecordEntity[] = []

    const wb = XLSX.readFile(path, { type: "binary", raw: true })
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1, raw: true })
    const address = data[2][3]

    for (let i = 11; i < data.length; i++) {
      const row = data[i]
      const date = moment(row[1], "YYYY-MM-DD HH:mm:ss").toDate()
      const currency = row[3]
      const amount = row[4]
      const netAmount = row[8]
      const fee = row[6]

      let record = new RecordEntity()
      record.date = date
      switch(row[2]) {
        case "Deposit":
          record.type = "DEPOSIT"
          record.amount = netAmount
          break
        case "Earnings":
          record.type = "EARN"
          record.amount = amount
          break
        case "Sell":
          record.type = "SWAP_SELL"
          record.amount = amount
          break
        case "Buy":
          record.type = "SWAP_BUY"
          record.amount = amount
          break
        case "Withdrawal":
          record.type = "WITHDRAW"
          record.amount = netAmount
          break
      }
      record.address = address
      record.currency = currency

      records.push(record)

      if(fee > 0) {
        let feeRecord = new RecordEntity()
        feeRecord.date = date
        feeRecord.type = "FEE"
        feeRecord.address = address
        feeRecord.amount = fee
        feeRecord.currency = currency
        records.push(feeRecord)
      }
    }

    return records
  }
}
