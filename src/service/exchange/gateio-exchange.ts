import * as moment from "moment-timezone"
import { Service } from "typedi"
import RecordEntity from "../../entity/record-entity"
import { ExchangeInterfaceToken } from "../../tokens"
import { ExchangeInterface } from "../../types/interfaces"
import * as XLSX from "xlsx"

const FROM_DATE = moment("2021-01-01T10:00:00")
const TO_DATE = moment()
const INTERVAL = 30

@Service({ id: ExchangeInterfaceToken, multiple: true })
export default class GateIOExchange implements ExchangeInterface {
  id(): string {
    return "gateio"
  }

  async importFile(path: string): Promise<RecordEntity[]> {
    let records: RecordEntity[] = []

    const wb = XLSX.readFile(path, { type: "binary", raw: true })
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1, raw: true })

    for (let i = 1; i < data.length; i++) {
      const row = data[i]
      const date = moment(row[2], "YYYY-MM-DD HH:mm:ss").toDate()
      const currency = row[4]
      const amount = parseFloat(row[6])
      const address = "my-gateio"

      let record = new RecordEntity()
      record.date = date
      record.currency = currency
      record.address = address
      switch(row[3]) {
        case "Withdrawals":
          record.type = "WITHDRAW"
          record.amount = -amount

          // manually hand made : withdraw are not included into export and have to be reported manually
          if(row[9]) {
            const withdrawalFeeAmount = parseFloat(row[9])

            record.amount -= withdrawalFeeAmount
            
            let withdrawalRecord = new RecordEntity()
            withdrawalRecord.date = date
            withdrawalRecord.currency = currency
            withdrawalRecord.address = address
            withdrawalRecord.type = "FEE"
            withdrawalRecord.amount = withdrawalFeeAmount
            records.push(withdrawalRecord)
          }
          break
        case "Order Filled":
          record.type = "SWAP_BUY"
          record.amount = amount
          break
        case "Order Placed":
          record.type = "SWAP_SELL"
          record.amount = -amount
          break
        case "Trading Fees":
          record.type = "FEE"
          record.amount = -amount
          break
        case "Deposits":
          record.type = "DEPOSIT"
          record.amount = amount
          break
        case "Airdrop":
          record.type = "EARN"
          record.amount = amount
          break
      }

      records.push(record)
    }

    return records
  }
  /*async fetchWithdrawals(
    currency?: string,
    since?: number,
    limit?: number,
    params?: Params
  ): Promise<Transaction[]> {
    let transactions: Transaction[] = []
    for (let day = FROM_DATE; day < TO_DATE; day.add(INTERVAL, "days")) {
      const response = await this.privateWalletGetWithdrawals(
        this.extend({
          from: day.unix(),
          to: day.unix() + 30 * 24 * 60 * 60,
        })
      )
      transactions = transactions.concat(this.parseTransactions(response))
    }

    return transactions
  }

  async fetchMyTrades(
    symbol?: string,
    since?: number,
    limit?: any,
    params?: Params
  ): Promise<Trade[]> {
    if (symbol === undefined) {
      throw new ArgumentsRequired(
        this.id + " fetchMyTrades() requires a symbol argument"
      )
    }
    await this.loadMarkets()
    const market = this.market(symbol)
    const request = this.prepareRequest(market)
    if (limit !== undefined) {
      request["limit"] = limit // default 100, max 1000
    }
    if (since !== undefined) {
      request["from"] = since
      request["to"] = since + 7 * 24 * 60 * 60
    }
    const method = this.getSupportedMapping(market["type"], {
      spot: "privateSpotGetMyTrades",
      margin: "privateSpotGetMyTrades",
      swap: "privateFuturesGetSettleMyTrades",
      future: "privateDeliveryGetSettleMyTrades",
    })
    const response = await this[method](this.extend(request, params))
    return this.parseTrades(response, market, since, limit)
  }*/
}
