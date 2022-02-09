export default class Wallet {
  private currencies: Map<string, number>

  constructor(
    private exchange: string,
    private address: string
  ) {
    this.currencies = new Map<string, number>()
  }

  public getExchange(): string {
    return this.exchange
  }

  public getAddress(): string {
    return this.address
  }

  public getCurrencies(): Map<string, number> {
    return this.currencies
  }

  public buy(currency: string, amount: number) {
    this.currencies.set(currency, (this.currencies.get(currency) || 0) + amount)
  }

  public sell(currency: string, amount: number) {
    this.currencies.set(currency, (this.currencies.get(currency) || 0) - amount)
  }

  public fee(currency: string, amount: number) {
    this.currencies.set(currency, (this.currencies.get(currency) || 0) - amount)
  }
}
