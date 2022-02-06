import * as express from "express"
import * as convict from "convict"
import { Service } from "typedi"
import { Server as HttpServer } from "http"
import { Connection } from "typeorm"
import AppConfig, { AppConfigData } from "./config/app-config"
import DatabaseLoader from "./loader/database-loader"
import ServerLoader from "./loader/server-loader"

@Service()
export default class App {
  private server: HttpServer

  constructor(
    private appConfig: AppConfig,
    private databaseLoader: DatabaseLoader,
    private serverLoader: ServerLoader
  ) {}

  public getConfig(): convict.Config<AppConfigData> {
    return this.appConfig.getConfig()
  }

  public getApp(): express.Application {
    return this.serverLoader.getApp()
  }

  public getConnection(): Connection {
    return this.databaseLoader.getConnection()
  }

  public getServer(): HttpServer {
    return this.server
  }

  public async start(): Promise<void> {
    await this.databaseLoader.load()
    await this.serverLoader.load()

    return new Promise((resolve: any) => {
      const PORT = this.appConfig.getConfig().get("port")
      const app = this.serverLoader.getApp()
      app.on("error", (err: any) => {
        process.exit(1)
      })
      this.server = app.listen(PORT, resolve)
    })
  }

  public async stop(): Promise<void> {
    this.server.close()
    this.databaseLoader.getConnection().close()
  }
}
