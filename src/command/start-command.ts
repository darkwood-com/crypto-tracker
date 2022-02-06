import "reflect-metadata"
import * as open from "open"
import * as Config from "@oclif/config"
import { default as Container } from "../container"
import { Command, flags } from "@oclif/command"
import App from "../app"

let processExistCode = 0

export default class StartCommand extends Command {
  static description = "Starts crypto-tracker api."

  static examples = [`$ crypto-tracker start`, `$ crypto-tracker start -o`]

  static flags = {
    help: flags.help({ char: "h" }),
    open: flags.boolean({
      char: "o",
      description: "opens the UI automatically in browser",
    }),
  }

  private app: App

  constructor(argv: string[], config: Config.IConfig) {
    super(argv, config)

    this.app = new Container().get(App)
  }

  /**
   * Opens the UI in browser
   */
  private openBrowser() {
    const url = `http://localhost:${this.app.getConfig().get("port")}`

    open(url, { wait: true })
  }

  /**
   * Stoppes crypto-tracker in a graceful way.
   */
  private async stopProcess() {
    setTimeout(() => {
      // In case that something goes wrong with shutdown we
      // kill after max. 30 seconds no matter what
      process.exit(processExistCode)
    }, 30000)

    process.exit(processExistCode)
  }

  async run() {
    // Make sure that crypto-tracker shuts down gracefully if possible
    process.on("SIGTERM", this.stopProcess)
    process.on("SIGINT", this.stopProcess)

    const { flags } = this.parse(StartCommand)

    // Wrap that the process does not close but we can still use async
    ;(async () => {
      try {
        await this.app.start()

        const url = `http://localhost:${this.app.getConfig().get("port")}`
        this.log(
          `\nCrypto tracker api v${
            require("../../package.json").version
          } ${this.app.getConfig().get('env')} is ready on:\n${url}`
        )

        // Allow to open crypto-tracker editor by pressing "o"
        if (Boolean(process.stdout.isTTY) && process.stdin.setRawMode) {
          process.stdin.setRawMode(true)
          process.stdin.resume()
          process.stdin.setEncoding("utf8")
          let inputText = ""

          if (flags.open) {
            this.openBrowser()
          }
          this.log(`\nPress "o" to open in Browser.`)
          process.stdin.on("data", (key: string) => {
            if (key === "o") {
              this.openBrowser()
              inputText = ""
            } else if (key.charCodeAt(0) === 3) {
              // Ctrl + c got pressed
              this.stopProcess()
            } else {
              // When anything else got pressed, record it and send it on enter into the child process
              if (key.charCodeAt(0) === 13) {
                // send to child process and print in terminal
                process.stdout.write("\n")
                inputText = ""
              } else {
                // record it and write into terminal
                inputText += key
                process.stdout.write(key)
              }
            }
          })
        }
      } catch (error) {
        if (error instanceof Error) {
          this.error(`There was an error: ${error.message}`)
        }

        processExistCode = 1
        // @ts-ignore
        process.emit("SIGINT")
      }
    })()
  }
}
