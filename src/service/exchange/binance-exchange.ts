import { Service } from "typedi"
import RecordEntity from "../../entity/record-entity"
import { ExchangeInterfaceToken } from "../../tokens"
import { ExchangeInterface } from "../../types/interfaces"
import * as XLSX from "xlsx"
import moment = require("moment-timezone")

@Service({ id: ExchangeInterfaceToken, multiple: true })
export default class BinanceExchange implements ExchangeInterface {
  id(): string {
    return "binance"
  }

  async importFile(path: string): Promise<RecordEntity[]> {
    let records: RecordEntity[] = []

    const wb = XLSX.readFile(path, { type: "binary", raw: true })
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1, raw: true })

    for (let i = 1; i < data.length; i++) {
      const row = data[i]
      const date = moment(row[1], "YYYY-MM-DD HH:mm:ss").toDate()
      const currency = row[4]
      const amount = row[5]
      const address = "my-binance"

      let record = new RecordEntity()
      record.date = date
      switch(row[3]) {
        case "Deposit":
          record.type = "DEPOSIT"
          record.amount = amount
          break
        case "Buy":
          if(amount > 0) {
            record.type = "SWAP_BUY"
            record.amount = amount
          } else {
            record.type = "SWAP_SELL"
            record.amount = -amount
          }
          break
        case "Withdraw":
          record.type = "WITHDRAW"
          record.amount = amount
          break
        case "Fee":
          record.type = "FEE"
          record.amount = -amount
          break
      }
      record.address = address
      record.currency = currency

      records.push(record)
    }

    return records
  }
}
