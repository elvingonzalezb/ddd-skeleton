import { IDatabaseRepository } from "../../domain/repositories/IDatabaseRepository";
import { Either } from "../../../shared/utils/Either";
import { PostgresConnection } from "../persistence/PostgresConnection";
import { InternalErrorResponse } from "../../../shared/responses/InternalErrorResponse";
import { MessageResponse } from "../../../shared/enums/Responses";
import { DatabaseRequest } from "../../../shared/types/Database";
import { CaseUseResponse } from "../../../shared/types/CommonType";
import { ResourceNotFoundResponse } from "../../../shared/responses/ResourceNotFoundResponse";

/**
 * Postgres Repository for interacting with the database.
 * Implements the IDatabaseRepository interface for CRUD operations.
 */
export class PostgresRepository implements IDatabaseRepository {
  /**
   * Creates a new instance of the Postgres repository.
   * @param {PostgresConnection} connection - An instance of the PostgreSQL database connection.
   */
  constructor(private readonly connection: PostgresConnection) {}

   /**
   * Executes a SQL query on the database.
   * @param {string} query - The SQL query to be executed.
   * @param {any[]} data - The parameters for the SQL query.
   * @returns {Promise<any>} - The result of the SQL query.
   * @throws {InternalErrorResponse} - If an error occurs during query execution.
   */
  private async executeQuery(query: string, data: any[]): Promise<any> {
    try {
      if (!this.connection.isActiveConnected()) {
        await this.connection.connect();
      }
      return await this.connection.query(query, data);
    } catch (error) {
      console.error("Error executing query:", error);
      throw new InternalErrorResponse(MessageResponse.INTERNAL_ERROR);
    } finally {
      if (this.connection.isActiveConnected()) {
        // Ensure proper disconnect if needed
        // await this.connection.disconnect();
      }
    }
  }

   /**
   * Saves a new template in the database.
   * @param {DatabaseRequest} request - The object containing the SQL query and data to be saved.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async save(request: DatabaseRequest): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(request.query, request.data);
      return Either.Ok({ data: result.rows[0] });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

  /**
   * Finds a template by its ID in the database.
   * @param {DatabaseRequest} request - The object containing the SQL query and data for the search.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async findById(request: DatabaseRequest): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(request.query, request.data);
      if (result.rows.length === 0) {
        return Either.Error(new ResourceNotFoundResponse(MessageResponse.RESOURCE_NOT_FOUND));
      }
      return Either.Ok({ data: result.rows[0] });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

   /**
   * Updates a template in the database.
   * @param {DatabaseRequest} request - The object containing the SQL query and data for the update.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async update(request: DatabaseRequest): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(request.query, request.data);
      if (result.rowCount === 0) {
        return Either.Error(new ResourceNotFoundResponse(MessageResponse.RESOURCE_NOT_FOUND));
      }
      return Either.Ok({ data: result.rows[0] });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

  /**
   * Deletes a template by its ID in the database.
   * @param {DatabaseRequest} request - The object containing the SQL query and data for the delete operation.
   * @returns {Promise<Either<CaseUseResponse, Error>>} - The result of the operation (success or error).
   */
  async delete(request: DatabaseRequest): Promise<Either<CaseUseResponse, Error>> {
    try {
      const result = await this.executeQuery(request.query, request.data);
      if (result.rowCount === 0) {
        return Either.Error(new ResourceNotFoundResponse(MessageResponse.RESOURCE_NOT_FOUND));
      }
      return Either.Ok({ data: { id: request.data[0] } });
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }
}
