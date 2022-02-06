import { Token } from "typedi"
import { ExchangeInterface } from "./types/interfaces"

export const ExchangeInterfaceToken = new Token<ExchangeInterface>(
  "exchange-interface"
)
