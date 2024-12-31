import { DatabaseRequest } from "../../shared/types/Database";
import { Template } from "../domain/entities/Template";

/**
 * Class that simulates interaction with an in-memory database.
 * Implements CRUD (Create, Read, Update, Delete).
 */
export class DriverMemory {
  // Stores the data in memory, organized by table name
  private static memoryStorage: Record<string, any[]> = {};

  /**
   * Prepares the data for inserting a into the in-memory storage.
   * @param request - Object with the data to be saved.
   * @returns DatabaseRequest object with the necessary information for the database operation.
   */
  public static prepareDataSave(request: Template): DatabaseRequest {
    const data = {
      id: request.id,
      name: request.name,
      status: request.status,
    };

    // Checks if the table already exists in memory; if not, it creates it.
    if (!this.memoryStorage[request.getTableName()]) {
      this.memoryStorage[request.getTableName()] = [];
    }

    // Adds the new Entity to the in-memory storage.
    this.memoryStorage[request.getTableName()].push(data);

    return {
      tableName: request.getTableName(),
      query: "",
      data: [data],
    };
  }

  /**
   * Prepares the query to search for by ID in the in-memory storage.
   * @param request - Object with the ID to search for.
   * @returns DatabaseRequest object with the search results.
   */
  public static prepareDataFindById(request: Template): DatabaseRequest {
    const tableData = this.memoryStorage[request.getTableName()] || [];
    const found = tableData.find((item) => item.id === request.id);

    return {
      tableName: request.getTableName(),
      query: request.id,
      data: found ? [found] : [],
    };
  }

  /**
   * Prepares the query to update in the in-memory storage.
   * @param request - Object with the data to update.
   * @returns DatabaseRequest object with the updated information.
   */
  public static prepareDataUpdate(request: Template): DatabaseRequest {
    const tableData = this.memoryStorage[request.getTableName()] || [];
    const index = tableData.findIndex((item) => item.id === request.id);

    // If the Entity exists, it updates it.
    if (index !== -1) {
      tableData[index] = { id: request.id, name: request.name, status: request.status };
    }

    return {
      tableName: request.getTableName(),
      query: request.id,
      data: index !== -1 ? [tableData[index]] : [],
    };
  }

  /**
   * Prepares the query to delete a by ID in the in-memory storage.
   * @param request - Entity object with the ID of the Entity to delete.
   * @returns DatabaseRequest object with the deletion information.
   */
  public static prepareDataDelete(request: Template): DatabaseRequest {
    const tableData = this.memoryStorage[request.getTableName()] || [];
    // Filters the data to remove the Entity with the corresponding ID.
    const filteredData = tableData.filter((item) => item.id !== request.id);

    // Updates the in-memory storage with the filtered data (without the deleted Entity).
    this.memoryStorage[request.getTableName()] = filteredData;

    return {
      tableName: request.getTableName(),
      query: request.id,
      data: [],
    };
  }

  /**
   * Method to get all records from a table in memory.
   * @param tableName - Name of the table to get the records from.
   * @returns An array with all the records from the table in memory.
   */
  public static getAll(tableName: string): any[] {
    // Returns all records from the specified table, or an empty array if the table doesn't exist.
    return this.memoryStorage[tableName] || [];
  }
}
