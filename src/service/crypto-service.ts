import * as fs from "fs"
import { InjectMany, Service } from "typedi"
import RecordEntity from "../entity/record-entity"
import Wallet from "../model/wallet"
import RecordRepository from "../repository/record-repository"
import { ExchangeInterfaceToken } from "../tokens"
import { ExchangeInterface } from "../types/interfaces"

@Service()
export default class CryptoService {
  constructor(
    @InjectMany(ExchangeInterfaceToken) private exchanges: ExchangeInterface[],
    private recordRepository: RecordRepository
  ) {}

  public async import(): Promise<void> {
    const exchangeRecords = async (exchange: ExchangeInterface) => {
      const records: RecordEntity[] = []
      const importPath = "./data/import"
      const processedPath = "./data/processed"
      const type = exchange.id()
      let files = fs.readdirSync(importPath)
      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        if (file.startsWith(`${type}-`)) {
          const exchangeRecords = await exchange.importFile(`${importPath}/${file}`)
          for (let i = 0; i < exchangeRecords.length; i++) {
            exchangeRecords[i].exchange = type
            records.push(exchangeRecords[i])
          }
          fs.renameSync(`${importPath}/${file}`, `${processedPath}/${file}`)
        }
      }
      return records
    }
    const records: RecordEntity[] = (
      await Promise.all(this.exchanges.map(exchangeRecords))
    ).reduce<RecordEntity[]>(
      (records: RecordEntity[], exchangeRecords: RecordEntity[]) => {
        for (let i = 0; i < exchangeRecords.length; i++) {
          records.push(exchangeRecords[i])
        }
        return records
      },
      []
    )

    for (let i = 0; i < records.length; i++) {
      const record = records[i]
      await this.recordRepository.save(records[i])
    }
  }

  public async getLastImportDate(address: string): Promise<Date | undefined> {
    let lastDate: Date|undefined = undefined
    const records = await this.recordRepository.find({'address': address})
    records.forEach((record) => {
      if(lastDate === undefined || record.date > lastDate) {
        lastDate = record.date
      }
    })

    return lastDate
  }

  public async getWallets() {
    let wallets: Map<String, Wallet> = new Map<String, Wallet>()
    const records = await this.recordRepository.find()
    for (let i = 0; i < records.length; i++) {
      const record = records[i]

      let wallet = wallets.get(record.address)
      if(!wallet) {
        wallet = new Wallet(record.address)
        wallets.set(record.address, wallet)
      }

      switch (record.type) {
        case "DEPOSIT":
        case "EARN":
        case "SWAP_BUY":
          wallet.buy(record.currency, record.amount)
          break
        case "WITHDRAW":
        case "SWAP_SELL":
          wallet.sell(record.currency, record.amount)
          break
        case "FEE":
          wallet.fee(record.currency, record.amount)
          break
        }
    }

    return wallets
  }

  /*public async exchange(): Promise<void> {
    const RATE_LIMIT = 50

    type Record = Transaction | Trade
    let transactions: Record[] = (
      await Promise.all(
        this.exchanges.map(async (exchange: Exchange) => {
          await exchange.loadMarkets()

          let trs: Record[] = []
          //trs = trs.concat(await exchange.fetchDeposits('EUR'))
          //trs = trs.concat(await exchange.fetchDeposits())

          // withdrawals
          trs = trs.concat(await exchange.fetchWithdrawals())

          if (exchange instanceof gateio) {
            trs = trs.concat(await exchange.fetchMyTrades("FLUX/USDT"))
            trs = trs.concat(await exchange.fetchMyTrades("BNB/USDT"))
            trs = trs.concat(await exchange.fetchMyTrades("HE/USDT"))
          } else {
            trs = trs.concat(await exchange.fetchMyTrades("BNB/USDT"))
            trs = trs.concat(await exchange.fetchMyTrades("BNB/EUR"))
          }

          return trs
        })
      )
    ).reduce((acc, current) => {
      acc = acc.concat(current)
      return acc
    }, [])

    transactions = transactions.sort((ta, tb) => ta.timestamp - tb.timestamp)

    let time = moment()
    let wb = XLSX.utils.book_new()

    let ws_name = "Transactions"
    let ws_data = [["Date", "Operation", "Currency", "Amount"]]
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i]
      const date = moment.tz(transaction.timestamp, "Europe/Paris")
      ws_data.push([
        date.format("DD-MM-YYYY HH:MM:SS"),
        transaction.type,
        transaction.info.symbol,
        transaction.amount,
      ])
    }
    let ws = XLSX.utils.aoa_to_sheet(ws_data)

    XLSX.utils.book_append_sheet(wb, ws, ws_name)
    XLSX.writeFile(wb, `dist/${time.format("YYYY-MM-DD")}-wallets.ods`, {
      bookType: "ods",
    })
  }*/
}
