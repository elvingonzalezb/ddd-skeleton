import { DatabaseRequest, DatabaseRequestMongoDB } from "../../shared/types/Database";
import { Template } from "../domain/entities/Template";

/**
 * Class responsible for interacting with MongoDB for CRUD operations on entities.
 */
export class DriverMongoDB {

  /**
   * Prepares the data for inserting a Entity into MongoDB.
   * @param request - Entity object with the data to be saved.
   * @returns DatabaseRequestMongoDB object containing necessary information for the database operation.
   */
  public static prepareDataSave(request: Template): DatabaseRequestMongoDB {
    const data = {
      id: request.id,
      name: request.name,
      status: request.status,
    };

    return {
      tableName: request.getTableName(),
      query: {},
      data: [data],
    };
  }

  /**
   * Prepares the query to find a Entity by ID in MongoDB.
   * @param request - Entity object with the ID to search for.
   * @returns DatabaseRequest object with the search query.
   */
  public static prepareDataFindById(request: Template): DatabaseRequest {
    const query = { id: request.id };

    return {
      tableName: request.getTableName(),
      query: query,
      data: [],
    };
  }

  /**
   * Prepares the query to update a Entity in MongoDB.
   * @param request - Entity object with the data to update.
   * @returns DatabaseRequest object with the update query.
   */
  public static prepareDataUpdate(request: Template): DatabaseRequest {
    const query = { id: request.id };
    const updateData = { $set: { name: request.name, status: request.status } };

    return {
      tableName: request.getTableName(),
      query: query,
      data: [updateData],
    };
  }

  /**
   * Prepares the query to delete a Entity by ID in MongoDB.
   * @param request - Entity object with the ID of the Entity to delete.
   * @returns DatabaseRequest object with the delete query.
   */
  public static prepareDataDelete(request: Template): DatabaseRequest {
    const queryDelete = { id: request.id };

    return {
      tableName: request.getTableName(),
      query: queryDelete,
      data: [],
    };
  }
}
