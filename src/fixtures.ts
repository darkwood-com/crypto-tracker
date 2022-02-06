import { default as Container } from "./container"
import DatabaseLoader from "./loader/database-loader"

const loadFixtures = async () => {
  const container = new Container()
  const databaseLoader = container.get(DatabaseLoader)

  try {
    await databaseLoader.load()
  } catch (err) {
    throw err
  } finally {
    const connection = databaseLoader.getConnection()
    if (connection) {
      await connection.close()
    }
  }
}

loadFixtures()
