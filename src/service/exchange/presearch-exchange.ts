import { Service } from "typedi"
import RecordEntity from "../../entity/record-entity"
import { ExchangeInterfaceToken } from "../../tokens"
import { ExchangeInterface } from "../../types/interfaces"
import * as XLSX from "xlsx"
import moment = require("moment-timezone")

@Service({ id: ExchangeInterfaceToken, multiple: true })
export default class PresearchExchange implements ExchangeInterface {
  id(): string {
    return "presearch"
  }

  async importFile(path: string): Promise<RecordEntity[]> {
    let records: RecordEntity[] = []

    const wb = XLSX.readFile(path, { type: "binary", raw: true })
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1, raw: true })

    for (let i = 1; i < data.length; i++) {
      const row = data[i]
      const date = moment(row[0], "YYYY-MM-DD HH:mm:ss").toDate()
      const description = row[2]
      const currency = "PRE"
      const amount = row[1]
      const address = "my-presearch"

      let record = new RecordEntity()
      record.date = date
      record.address = address
      record.currency = currency
      if(description === "Search Reward" || description === "Node rewards claimed") {
        record.type = "EARN"
        record.amount = amount
      } else if(description === "Deposit from blockchain") {
        record.type = "DEPOSIT"
        record.amount = amount
      } else if(description.indexOf("Staked to search node") !== -1) {
        // stacked operations are not considered for records
        continue
      }

      records.push(record)
    }

    return records
  }
}
