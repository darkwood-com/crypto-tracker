import { Container as DIContainer, Token, Constructable } from "typedi"
import { IocContainer } from "@tsoa/runtime"
import { ConnectionManager } from "typeorm"
import GateIOExchange from "./service/exchange/gateio-exchange"
import SwissbordExchange from "./service/exchange/swissborg-exchange"
import UpholdExchange from "./service/exchange/uphold-exchange"
import BinanceExchange from "./service/exchange/binance-exchange"
import ProbitExchange from "./service/exchange/probit-exchange"
import PresearchExchange from "./service/exchange/presearch-exchange"
import CoinmetroExchange from "./service/exchange/coinmetro-exchange"
import ZelcoreExchange from "./service/exchange/zelcore-exchange"

export default class Container implements IocContainer {
  constructor(protected init: boolean = false) {}

  get<T>(type: Constructable<T>): T
  get<T>(id: string): T
  get<T>(id: Token<T>): T
  get<T>(service: { service: T }): T
  get<T>(controller: { prototype: T }): T
  get<T>(id: any): T {
    if (!this.init) {
      const env = process.env.NODE_ENV || "development"
      DIContainer.set("env", env)
      DIContainer.import([
        GateIOExchange,
        SwissbordExchange,
        UpholdExchange,
        BinanceExchange,
        ProbitExchange,
        PresearchExchange,
        CoinmetroExchange,
        ZelcoreExchange
      ])

      // typedi + typeorm
      DIContainer.set({ id: ConnectionManager, type: ConnectionManager })

      if (env === "test") {
      } else {
      }

      this.init = true
    }

    return DIContainer.get(id)
  }
}

const iocContainer = new Container()

export { iocContainer }
