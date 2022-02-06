import ConnectionConfig from "./config/connection-config"
import Container from "./container"

module.exports = new Container().get(ConnectionConfig).getConfig()
