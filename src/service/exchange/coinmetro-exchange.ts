import { Service } from "typedi"
import RecordEntity from "../../entity/record-entity"
import { ExchangeInterfaceToken } from "../../tokens"
import { ExchangeInterface } from "../../types/interfaces"
import * as XLSX from "xlsx"
import moment = require("moment-timezone")

@Service({ id: ExchangeInterfaceToken, multiple: true })
export default class CoinmetroExchange implements ExchangeInterface {
  id(): string {
    return "coinmetro"
  }

  async importFile(path: string): Promise<RecordEntity[]> {
    let records: RecordEntity[] = []

    const wb = XLSX.readFile(path, { type: "binary", raw: true })
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1, raw: true })

    for (let i = 1; i < data.length; i++) {
      const row = data[i]
      const currency = row[0]
      const date = moment(row[1], "YYYY-MM-DD HH:mm:ss").toDate()
      const description = row[2]
      const address = "my-coinmetro"
      const amount = row[3]

      let record = new RecordEntity()
      record.date = date
      record.address = address
      record.currency = currency
      record.amount = amount
      if(description.indexOf('Deposit') !== -1) {
        record.type = "DEPOSIT"
      } else if(description === "Staking Allocation") {
        continue
      } else if(description.indexOf('Bonus') !== -1) {
        record.type = "EARN"
      }
      records.push(record)
    }

    return records
  }
}
