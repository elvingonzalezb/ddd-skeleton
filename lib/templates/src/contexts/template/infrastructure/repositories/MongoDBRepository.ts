import { IDatabaseRepository } from "../../domain/repositories/IDatabaseRepository";
import { Either } from "../../../shared/utils/Either";
import { MongoDBConnection } from "../persistence/MongoDBConnection";
import { InternalErrorResponse } from "../../../shared/responses/InternalErrorResponse";
import { MessageResponse } from "../../../shared/enums/Responses";
import { CaseUseResponse } from "../../../shared/types/CommonType";
import { DatabaseRequestMongoDB } from "../../../shared/types/Database";
import { ResourceNotFoundResponse } from "../../../shared/responses/ResourceNotFoundResponse";

/**
 * MongoDBRepository implements the IDatabaseRepository interface for handling MongoDB operations.
 * It includes methods to save, find, update, and delete documents from the MongoDB database.
 */
export class MongoDBRepository implements IDatabaseRepository {
  constructor(private readonly connection: MongoDBConnection) {}

  /**
   * Executes a database query within the context of the MongoDB connection.
   * Ensures the connection is active before executing and disconnects afterward.
   * @param {Function} action - The action to execute, usually a database query.
   * @returns {Promise<T>} - A promise resolving to the result of the query.
   * @throws {InternalErrorResponse} - If an error occurs during execution.
   */

  private async executeQuery<T>(action: () => Promise<T>): Promise<T> {
    try {
     // Ensure the database connection is active
      if (!this.connection.isActiveConnected()) {
        await this.connection.connect();
      }
       // Execute the provided action (e.g., a database operation)
      return await action();
    } catch (error) {
      console.error("Error executing query:", error);
      throw new InternalErrorResponse(MessageResponse.INTERNAL_ERROR);
    } finally {
      // Disconnect from the database after the operation
      if (this.connection.isActiveConnected()) {
        await this.connection.disconnect();
      }
    }
  }

  /**
   * Saves a new document to the MongoDB collection.
   * @param {DatabaseRequestMongoDB} request - The database request containing the table name and data.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async save(request: DatabaseRequestMongoDB): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(async () => {
        const collection = this.connection.getConnection().collection(request.tableName);
        return await collection.insertOne(request.data[0]);
      });
      return Either.Ok({ data: result.insertedId });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

   /**
   * Finds a document by its ID from the MongoDB collection.
   * @param {DatabaseRequestMongoDB} request - The database request containing the table name and query.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async findById(request: DatabaseRequestMongoDB): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(async () => {
        const collection = this.connection.getConnection().collection(request.tableName);
        return await collection.findOne(request.query);
      });

      if (!result) {
        return Either.Error(new ResourceNotFoundResponse(MessageResponse.RESOURCE_NOT_FOUND));
      }

      return Either.Ok({ data: result });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

  /**
   * Updates a document in the MongoDB collection.
   * @param {DatabaseRequestMongoDB} request - The database request containing the table name, query, and data.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async update(request: DatabaseRequestMongoDB): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(async () => {
        const collection = this.connection.getConnection().collection(request.tableName);
        return await collection.updateOne(request.query, request.data[0]);
      });

      if (result.matchedCount === 0) {
        return Either.Error(new ResourceNotFoundResponse(MessageResponse.RESOURCE_NOT_FOUND));
      }

      return Either.Ok({ data: result });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

  /**
   * Finds and updates a document in the MongoDB collection.
   * Uses findOneAndUpdate to retrieve and update the document in one operation.
   * @param {DatabaseRequestMongoDB} request - The database request containing the table name, query, and data.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async findAndUpdate(request: DatabaseRequestMongoDB): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(async () => {
        const collection = this.connection.getConnection().collection(request.tableName);
        return await collection.findOneAndUpdate(request.query, request.data[0], { returnDocument: 'after' });
      });

      if (!result || !result.value) {
        return Either.Error(new ResourceNotFoundResponse(MessageResponse.RESOURCE_NOT_FOUND));
      }

      return Either.Ok({ data: result.value });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

   /**
   * Deletes a document from the MongoDB collection.
   * @param {DatabaseRequestMongoDB} request - The database request containing the table name and query.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async delete(request: DatabaseRequestMongoDB): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(async () => {
        const collection = this.connection.getConnection().collection(request.tableName);
        return await collection.deleteOne(request.query);
      });

      if (result.deletedCount === 0) {
        return Either.Error(new ResourceNotFoundResponse(MessageResponse.RESOURCE_NOT_FOUND));
      }

      return Either.Ok({ data: result });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }
}
