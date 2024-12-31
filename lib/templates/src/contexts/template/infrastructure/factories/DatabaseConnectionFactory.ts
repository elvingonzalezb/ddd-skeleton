import { DriverMemory } from "../../utils/prepareDataDriverMemory";
import { DriverMongoDB } from "../../utils/prepareDataDriverMongodb";
import { DriverPostgres } from "../../utils/prepareDataDriverPostgres";
import { MongoDBConnection } from "../persistence/MongoDBConnection";
import { PostgresConnection } from "../persistence/PostgresConnection";
import { MemoryRepository } from "../repositories/MemoryRepository";

/**
 * Factory class responsible for managing the creation of database connections and drivers.
 */
export class DatabaseConnectionFactory {
   /**
   * Map of configurations for database connections.
   * @type {Object}
   * @property {MongoDBConnection} mongodb - MongoDB connection class.
   * @property {PostgresConnection} postgres - PostgreSQL connection class.
   * @property {MemoryRepository} memory - In-memory database connection class.
   */
  static readonly connectionsMap = {
    mongodb: MongoDBConnection,
    postgres: PostgresConnection,
    memory: MemoryRepository,
  };

  /**
   * Map of configurations for database drivers.
   * @type {Object}
   * @property {DriverMongoDB} mongodb - MongoDB driver class for preparing operations.
   * @property {DriverPostgres} postgres - PostgreSQL driver class for preparing operations.
   * @property {DriverMemory} memory - In-memory driver for preparing operations.
   */
  static readonly driversMap = {
    mongodb: DriverMongoDB,
    postgres: DriverPostgres,
    memory: DriverMemory,
  };

  /**
   * Creates a connection instance based on the specified database driver type.
   * @param {string} driver - The type of the database driver (e.g., "memory", "mongodb", "postgres").
   * @returns {Object} - An instance of the corresponding connection class.
   * @throws {Error} - Throws an error if the provided driver type is not supported.
   */
  static createConnection(driver: "memory" | "mongodb" | "postgres") {
    const ConnectionClass = this.connectionsMap[driver];
    if (!ConnectionClass) {
      throw new Error(`Driver "${driver}" not supported.`);
    }
    return new ConnectionClass();
  }

   /**
   * Retrieves the driver class for the specified database type.
   * @param {string} driver - The type of the database driver (e.g., "memory", "mongodb", "postgres").
   * @returns {Function} - The class of the corresponding driver.
   * @throws {Error} - Throws an error if the provided driver type is not supported.
   */
  static getDriver(driver: "memory" | "mongodb" | "postgres") {
    const DriverClass = this.driversMap[driver];
    if (!DriverClass) {
      throw new Error(`Driver "${driver}" not supported.`);
    }
    return DriverClass;
  }
}
