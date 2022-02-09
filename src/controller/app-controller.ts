import { Service } from "typedi"
import { Controller, Get, Route } from "tsoa"
import CryptoService from "../service/crypto-service"
import Wallet from "../model/wallet"
import RecordRepository from "../repository/record-repository"
import * as CCXT from "ccxt"
import { off } from "process"

@Route("app")
@Service()
class AppController extends Controller {
  constructor(
    private cryptoService: CryptoService,
    private recordRepository: RecordRepository
  ) {
    super()
  }

  @Get("import")
  public async import(): Promise<{status: string}> {
    await this.cryptoService.import()
    return {
      status: 'ok'
    }
  }

  @Get("wallets")
  public async wallets(): Promise<Object[]> {
    const exchanges = [new CCXT.binance(), new CCXT.probit(), new CCXT.gateio()]
    for(let i = 0; i < exchanges.length; i++) {
      await exchanges[i].loadMarkets()
    }

    let wallets = await this.cryptoService.getWallets()
    let obj: Object[] = []

    for (let [key, wallet] of wallets) {
      const detailCurrencies: any = {}
      const currencies = wallet.getCurrencies()
      for(let [currency, amount] of currencies) {
        let price: number|undefined = undefined
        for(let j = 0; j < exchanges.length; j++) {
          const symbol = `${currency}/USDT`
          if(!price && exchanges[j].markets[symbol]) {
            let orderbook = await exchanges[j].fetchOrderBook(symbol)
            let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined
            let ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined
            if(bid && ask) {
              price = (bid + ask) / 2
            }
          }
        }
        detailCurrencies[currency] = {
          usdValue: price ? amount * price : undefined,
          value: amount
        }
      }

      obj.push({
        exchange: wallet.getExchange(),
        address: wallet.getAddress(),
        currencies: detailCurrencies
      })
    }

    return obj
  }

  @Get("ballance")
  public async ballance(): Promise<Object> {
    let result: {deposit: number} = {
      deposit: 0
    }

    let records = await this.recordRepository.find({type: "DEPOSIT", currency: "EUR"})
    for(let i = 0; i < records.length; i++) {
      result.deposit += records[i].amount
    }

    return result
  }

  @Get("version")
  public async version(): Promise<{ version: string }> {
    return {
      version: `v${require("../../package.json").version}`,
    }
  }
}

export { AppController }
