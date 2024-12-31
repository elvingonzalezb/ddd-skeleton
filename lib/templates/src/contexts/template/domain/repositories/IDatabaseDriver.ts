export interface IDatabaseDriver {
  /**
   * Prepares data for saving into the database.
   * This method should handle any transformation or formatting of the data
   * to align with the requirements of the database.
   * @param data - The data to be saved in the database.
   * @returns The prepared data ready for saving.
   */
  prepareDataSave(data: any): any;

  /**
   * Prepares data for updating an existing entity in the database.
   * This method should handle any necessary transformations or formatting for the update operation.
   * @param data - The data to update in the database.
   * @returns The prepared data ready for the update query.
   */
  prepareDataUpdate(data: any): any;

  /**
   * Prepares data for a "find by ID" query in the database.
   * This method should ensure that the provided ID is properly formatted for the query.
   * @param id - The ID of the entity to find.
   * @returns The formatted data for the find query.
   */
  prepareDataFindById(id: any): any;

  /**
   * Prepares data for deleting an entity from the database.
   * This method should handle any necessary data formatting or transformations for the delete operation.
   * @param data - The data to delete from the database.
   * @returns The prepared data for the delete query.
   */
  prepareDataDelete(data: any): any;
}
