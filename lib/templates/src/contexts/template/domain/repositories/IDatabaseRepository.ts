import { CaseUseResponse } from "../../../shared/types/CommonType";
import { DatabaseRequest } from "../../../shared/types/Database";
import { Either } from "../../../shared/utils/Either";

/**
 * Interface for database repositories that will perform CRUD operations.
 */
export interface IDatabaseRepository {
  /**
   * Saves data to the database.
   * @param data - The data to be saved.
   * @returns A promise that resolves to an Either containing either the response or an error.
   */
  save(data: DatabaseRequest): Promise<Either<CaseUseResponse, Error>>;

  /**
   * Finds an entity in the database by its ID.
   * @param data - The request containing the ID of the entity to be retrieved.
   * @returns A promise that resolves to an Either containing either the found data or an error.
   */
  findById(data: DatabaseRequest): Promise<Either<CaseUseResponse, Error>>;

  /**
   * Updates an entity in the database.
   * @param data - The data to be updated.
   * @returns A promise that resolves to an Either containing either the updated data or an error.
   */
  update(data: DatabaseRequest): Promise<Either<CaseUseResponse, Error>>;

  /**
   * Deletes an entity from the database.
   * @param data - The data of the entity to be deleted.
   * @returns A promise that resolves to an Either containing either a success response or an error.
   */
  delete(data: DatabaseRequest): Promise<Either<CaseUseResponse, Error>>;
}
