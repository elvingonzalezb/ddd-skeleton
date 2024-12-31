import { DatabaseRequest } from "../../shared/types/Database";
import { Template } from "../domain/entities/Template";

/**
 * Class responsible for interacting with PostgreSQL for CRUD operations on Template entities.
 */
export class DriverPostgres {

  /**
   * Prepares the data for inserting a Entity into PostgreSQL.
   * @param request - Entity object with the data to be saved.
   * @returns DatabaseRequest object containing necessary information for the database operation.
   */
  public static prepareDataSave(request: Template): DatabaseRequest {
    const query = `INSERT INTO ${request.getTableName()} (id, name, status) VALUES ($1, $2, $3)`;

    return {
      tableName: request.getTableName(),
      query: query,
      data: [request.id, request.name, request.status],
    };
  }

  /**
   * Prepares the query to find a Entity by ID in PostgreSQL.
   * @param request - Entity object with the ID to search for.
   * @returns DatabaseRequest object with the search query.
   */
  public static prepareDataFindById(request: Template): DatabaseRequest {
    const query = `SELECT * FROM ${request.getTableName()} WHERE id = $1`;

    return {
      tableName: request.getTableName(),
      query: query,
      data: [request.id],
    };
  }

  /**
   * Prepares the query to update a Entity in PostgreSQL.
   * @param request - Entity object with the data to update.
   * @returns DatabaseRequest object with the update query.
   */
  public static prepareDataUpdate(request: Template): DatabaseRequest {
    const query = `UPDATE ${request.getTableName()} SET name = $1, status = $2 WHERE id = $3`;

    return {
      tableName: request.getTableName(),
      query: query,
      data: [request.name, request.status, request.id],
    };
  }

  /**
   * Prepares the query to delete a Entity by ID in PostgreSQL.
   * @param request - Entity object with the ID of the Entity to delete.
   * @returns DatabaseRequest object with the delete query.
   */
  public static prepareDataDelete(request: Template): DatabaseRequest {
    const query = `DELETE FROM ${request.getTableName()} WHERE id = $1`;

    return {
      tableName: request.getTableName(),
      query: query,
      data: [request.id],
    };
  }
}
