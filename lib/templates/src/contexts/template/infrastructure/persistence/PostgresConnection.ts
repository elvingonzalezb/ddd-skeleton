import { Client } from "pg";

/**
 * PostgresConnection class for managing the connection to a PostgreSQL database.
 * It provides methods for connecting, disconnecting, and executing SQL queries.
 */
export class PostgresConnection {
  private client: Client | null = null;  // PostgreSQL client instance
  private isConnected: boolean = false;  // Indicates whether the connection is active

  /**
   * Constructs the PostgresConnection class and initializes the PostgreSQL client.
   * It retrieves the database connection details from environment variables.
   */
  constructor() {
    this.initializeClient();
  }

  /**
   * Initializes the PostgreSQL client with configuration from environment variables.
   * @throws Will throw an error if any required environment variable is missing.
   */
  private initializeClient() {
    if (!this.client) {
      this.client = new Client({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: parseInt(process.env.POSTGRES_PORT ?? "5432", 10),
      });
    }
  }

  /**
   * Connects to the PostgreSQL database.
   * Logs an error message if the connection fails, and throws an error.
   * @returns {Promise<void>} Resolves once the connection is established.
   * @throws Will throw an error if the connection attempt fails.
   */
  async connect(): Promise<void> {
    if (this.isConnected) {
      console.log("Already connected to the database.");
      return;
    }

    try {
      if (this.client) {
        await this.client.connect();  // Connects to the PostgreSQL database
        this.isConnected = true;  // Marks the connection as established
        console.log("Connection established successfully.");
      } else {
        throw new Error("Client is not initialized.");
      }
    } catch (error) {
      throw new Error("Error connecting to the database: " + error);
    }
  }

  /**
   * Executes a parameterized SQL query on the connected database.
   * @param {string} query The SQL query string to be executed.
   * @param {any[]} params An array of parameters to be used in the query.
   * @returns {Promise<any>} The result of the query execution.
   * @throws Will throw an error if the query execution fails.
   */
  async query(query: string, params: any[] = []): Promise<any> {
    try {
      if (this.client) {
        const result = await this.client.query(query, params);
        return result;
      } else {
        throw new Error("Client is not initialized.");
      }
    } catch (error) {
      throw new Error("Error executing query: " + error);
    }
  }

  /**
   * Executes a simple SQL query (without parameters) on the connected database.
   * @param {string} query The SQL query string to be executed.
   * @returns {Promise<any>} The result of the query execution.
   * @throws Will throw an error if the query execution fails.
   */
  async simpleQuery(query: string): Promise<any> {
    try {
      if (this.client) {
        const result = await this.client.query(query);
        return result;
      } else {
        throw new Error("Client is not initialized.");
      }
    } catch (error) {
      throw new Error("Error executing simple query: " + error);
    }
  }

  /**
   * Disconnects from the PostgreSQL database.
   * Marks the connection as closed and logs the status.
   * @returns {Promise<void>} Resolves once the disconnection is complete.
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.end();
      this.client = null;
      this.isConnected = false;
      console.log("Connection closed.");
    }
  }

  /**
   * Checks if the PostgreSQL database connection is active.
   * @returns {boolean} True if the connection is active, false otherwise.
   */
  isActiveConnected(): boolean {
    return this.isConnected;
  }
}
