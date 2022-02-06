import { Service } from "typedi"
import { ConnectionOptions } from "typeorm"
import RecordEntity from "../entity/record-entity"
import AppConfig from "./app-config"

@Service()
export default class ConnectionConfig {
  constructor(private params: AppConfig) {}

  public async getConfig(): Promise<ConnectionOptions> {
    const config = this.params.getConfig()
    const dbType = config.get("database.type")

    let connectionOptions: ConnectionOptions

    switch (dbType) {
      case "mongodb":
        connectionOptions = {
          type: "mongodb",
          url: config.get("database.mongodb.connectionUrl"),
          useNewUrlParser: true,
        }
        break

      case "postgres":
        connectionOptions = {
          type: "postgres",
          database: config.get("database.postgres.database"),
          host: config.get("database.postgres.host"),
          password: config.get("database.postgres.password"),
          port: config.get("database.postgres.port"),
          username: config.get("database.postgres.user"),
        }
        break

      case "mysql":
        connectionOptions = {
          type: "mysql",
          database: config.get("database.mysql.database"),
          host: config.get("database.mysql.host"),
          password: config.get("database.mysql.password"),
          port: config.get("database.mysql.port"),
          username: config.get("database.mysql.user"),
        }
        break

      case "sqlite":
        connectionOptions = {
          type: "sqlite",
          database: config.get("database.sqlite.database"),
        }
        break

      default:
        throw new Error(`The database "${dbType}" is currently not supported!`)
    }

    let basePath = "./src"
    let extension = "ts"
    if (config.get("env") === "production" || config.get("env") === "preprod") {
      basePath = "./dist"
      extension = "js"
    }

    Object.assign(connectionOptions, {
      entities: [RecordEntity],
      //synchronize: true,
      migrationsTableName: `migration`,
      migrations: [`${basePath}/migration/*.${extension}`],
      cli: {
        entitiesDir: `${basePath}/entity`,
        migrationsDir: `${basePath}/migration`,
      },
      logging: false,
    })

    return connectionOptions
  }
}
