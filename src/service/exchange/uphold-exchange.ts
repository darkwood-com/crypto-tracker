import { Service } from "typedi"
import RecordEntity from "../../entity/record-entity"
import { ExchangeInterfaceToken } from "../../tokens"
import { ExchangeInterface } from "../../types/interfaces"
import * as XLSX from "xlsx"
import moment = require("moment-timezone")

@Service({ id: ExchangeInterfaceToken, multiple: true })
export default class UpholdExchange implements ExchangeInterface {
  id(): string {
    return "uphold"
  }

  async importFile(path: string): Promise<RecordEntity[]> {
    let records: RecordEntity[] = []

    const wb = XLSX.readFile(path, { type: "binary", raw: true })
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<any>(ws, { header: 0, raw: true })

    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      const date = moment(row["Date"], "ddd MMM DD YYYY HH:mm:ss Z").toDate()
      const upholdAdress = "my-uphold"

      switch (row["Type"]) {
        case "in":
          let inRecord = new RecordEntity()
          inRecord.date = date
          inRecord.type = "DEPOSIT"
          inRecord.address = upholdAdress
          inRecord.amount = parseFloat(row["Origin Amount"])
          inRecord.currency = row["Origin Currency"]
          records.push(inRecord)
          break
        case "out":
          let outRecord = new RecordEntity()
          outRecord.date = date
          outRecord.type = "WITHDRAW"
          outRecord.address = upholdAdress
          outRecord.amount = parseFloat(row["Destination Amount"])
          outRecord.currency = row["Destination Currency"]
          records.push(outRecord)
          break
        case "transfer":
          let swapSellRecord = new RecordEntity()
          swapSellRecord.date = date
          swapSellRecord.type = "SWAP_SELL"
          swapSellRecord.address = upholdAdress
          swapSellRecord.amount = parseFloat(row["Origin Amount"])
          swapSellRecord.currency = row["Origin Currency"]
          records.push(swapSellRecord)

          let swapBuyRecord = new RecordEntity()
          swapBuyRecord.date = date
          swapBuyRecord.type = "SWAP_BUY"
          swapBuyRecord.address = upholdAdress
          swapBuyRecord.amount = parseFloat(row["Destination Amount"])
          swapBuyRecord.currency = row["Destination Currency"]
          records.push(swapBuyRecord)
          break
        default:
          throw new Error("Not reconized record type")
      }

      if(row['Fee Amount'] && row['Fee Currency']) {
        let feeRecord = new RecordEntity()
        feeRecord.date = date
        feeRecord.type = "FEE"
        feeRecord.address = upholdAdress
        feeRecord.amount = parseFloat(row['Fee Amount'])
        feeRecord.currency = row['Fee Currency']
        records.push(feeRecord)
      }
    }

    return records
  }
}
