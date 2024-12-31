import { MongoClient, Db } from "mongodb";
import { DatabaseConnection } from "./DatabaseConnection";

/**
 * MongoDBConnection class for handling the MongoDB database connection.
 * It extends the DatabaseConnection class and provides methods to connect, disconnect, and get the database connection.
 */
export class MongoDBConnection extends DatabaseConnection {
  private readonly client: MongoClient;
  private db: Db | null = null;
  private readonly databaseName: string;

  /**
   * Constructs the MongoDBConnection class.
   * Retrieves the MongoDB URI and database name from environment variables.
   * @throws Will throw an error if the URI or database name is not defined in the environment variables.
   */
  constructor() {
    super();

    const uri = process.env.MONGODB_URI;
    const databaseName = process.env.MONGODB_DATABASE;

    // Throw error if either the URI or database name is missing
    if (!uri || !databaseName) {
      throw new Error("MONGODB_URI or MONGODB_DATABASE is not defined in the environment variables.");
    }

    this.client = new MongoClient(uri);
    this.databaseName = databaseName;
  }

  /**
   * Connects to the MongoDB database.
   * If already connected, logs a message and returns.
   * @returns {Promise<void>} A promise that resolves once the connection is successful or throws an error if unable to connect.
   */
  async connect(): Promise<void> {
    if (this.db) {
      console.log("Already connected to MongoDB.");
      return;
    }

    try {
      // Attempt to connect to the MongoDB server and assign the database
      await this.client.connect();
      this.db = this.client.db(this.databaseName);
      console.log("Connected to MongoDB database.");
    } catch (error) {
      console.error("Error connecting to MongoDB database", error);
      throw error;
    }
  }

  /**
   * Disconnects from the MongoDB database.
   * If already disconnected, logs a message.
   * @returns {Promise<void>} A promise that resolves once the disconnection is complete.
   */
  async disconnect(): Promise<void> {
    if (this.db) {
      // Close the MongoDB connection if it's open
      await this.client.close();
      this.db = null;
      console.log("Disconnected from MongoDB database.");
    } else {
      console.log("MongoDB connection is already closed.");
    }
  }

  /**
   * Gets the current MongoDB database connection.
   * @returns {Db} The MongoDB database connection.
   * @throws Will throw an error if the MongoDB database is not connected.
   */
  getConnection() {
    if (!this.db) {
      throw new Error("MongoDB is not connected.");
    }
    return this.db;
  }

  /**
   * Checks if there is an active connection to the MongoDB database.
   * @returns {boolean} True if the database is connected, false otherwise.
   */
   isActiveConnected(): boolean {
    return this.db !== null;
  }

}
