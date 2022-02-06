import { Service } from "typedi"
import { Controller, Get, Route } from "tsoa"
import CryptoService from "../service/crypto-service"
import Wallet from "../model/wallet"
import RecordRepository from "../repository/record-repository"

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
    let wallets = await this.cryptoService.getWallets()
    let obj: Object[] = []

    wallets.forEach((wallet: Wallet) => {
      obj.push({
        address: wallet.getAddress(),
        currencies: Object.fromEntries(wallet.getCurrencies())
      })
    })

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
