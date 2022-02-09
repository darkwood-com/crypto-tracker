import { Service } from "typedi"
import RecordEntity from "../../entity/record-entity"
import { ExchangeInterfaceToken } from "../../tokens"
import { ExchangeInterface } from "../../types/interfaces"
import * as XLSX from "xlsx"
import moment = require("moment-timezone")

@Service({ id: ExchangeInterfaceToken, multiple: true })
export default class ZelcoreExchange implements ExchangeInterface {
  id(): string {
    return "zelcore"
  }

  async importFile(path: string): Promise<RecordEntity[]> {
    const m = path.match(/zelcore\-([A-Z]+)\_transactions\_([a-zA-Z0-9]+)\.csv/)
    if(m === null) {
      return []
    }

    const currency = m[1]
    const address = m[2]

    let records: RecordEntity[] = []

    const wb = XLSX.readFile(path, { type: "binary", raw: true })
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1, raw: true })

    for (let i = 1; i < data.length; i++) {
      const row = data[i]
      const date = moment(row[1], "DD/MM/YYYY, HH:mm:ss").toDate()
      const amount = row[3]

      let record = new RecordEntity()
      record.date = date
      switch(row[4]) {
        case "received":
          record.type = "DEPOSIT"
          record.amount = amount
          break
        case "sent":
          record.type = "WITHDRAW"
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
