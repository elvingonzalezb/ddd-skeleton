import { RepositoryFactory } from './template/infrastructure/factories/RepositoryFactory';
import { DatabaseConnectionFactory } from './template/infrastructure/factories/DatabaseConnectionFactory';
import { databaseConfig } from './template/config/databaseConfig';

/**
 * The ApplicationCore class is responsible for initializing and setting up the core components of the application,
 * including the database connection, the driver, and the repository. It ensures that the application
 * can dynamically interact with different database drivers based on the configuration.
 */
export class ApplicationCore {
  /**
   * The driver used for database operations.
   * The driver is dynamically set based on the configuration.
   * @type {any}
   */
  static driver: any;

  /**
   * The active database connection.
   * It is created by the DatabaseConnectionFactory based on the specified driver.
   * @type {any}
   */
  static connection: any;

  /**
   * The repository for interacting with the database.
   * It is created by the RepositoryFactory based on the specified driver and connection.
   * @type {any}
   */
  static repository: any;

  /**
   * Initializes the core components of the application, including setting up the database connection,
   * determining the driver dynamically, and creating the repository.
   * This function is typically called when the application starts to ensure that the necessary resources
   * are ready for use.
   *
   * @example
   * ApplicationCore.initialize();
   *
   * @returns {void}
   */
  static initialize() {
    // Create the connection based on the configured driver
    this.connection = DatabaseConnectionFactory.createConnection(
      databaseConfig.driver
    );

    // Get the driver dynamically using the configured driver type
    this.driver = DatabaseConnectionFactory.getDriver(databaseConfig.driver);

    // Create the repository using the configured driver and connection
    this.repository = RepositoryFactory.createRepository(
      databaseConfig.driver,
      this.connection
    );
  }
}
