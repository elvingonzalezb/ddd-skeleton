/**
 * LocalStore class simulates data storage operations.
 * It provides methods for setting, getting, and deleting data with simulated responses.
 * This class uses a Singleton pattern to ensure only one instance is used.
 */
import { ResponseStatus } from "../../../shared/enums/Responses";
import { LocalStoreResponse } from "../../../shared/interfaces/Responses";

export class LocalStore {
  // Singleton instance of the LocalStore class.
  private static instance: LocalStore;

  // In-memory storage represented as a Map.
  private readonly storage: Map<string, any>;

  // Private constructor to prevent direct instantiation of the class.
  private constructor() {
      this.storage = new Map();
  }

  /**
   * Retrieves the singleton instance of the LocalStore.
   * If the instance doesn't exist, it creates and returns one.
   * @returns {LocalStore} The singleton instance of the LocalStore class.
   */
  static getInstance(): LocalStore {
      if (!LocalStore.instance) {
          LocalStore.instance = new LocalStore();
      }
      return LocalStore.instance;
  }

  /**
   * Sets a key-value pair in the storage.
   * Returns a response object indicating success or failure.
   * @param {string} key - The key to store the value under.
   * @param {any} value - The value to be stored.
   * @returns {LocalStoreResponse} The response object indicating the result of the operation.
   */
  set(key: string, value: any): LocalStoreResponse {
    try {
      // Attempt to store the value in the Map.
      this.storage.set(key, value);
      return { code: ResponseStatus.OPERATION_OK, message: "Record saved successfully." };
    } catch {
      // If an error occurs, return an error response.
      return { code: ResponseStatus.INTERNAL_ERROR, message: "Failed to save record." };
    }
  }

  /**
   * Retrieves a value from the storage by key.
   * Returns a response object indicating whether the key was found or not.
   * @param {string} key - The key of the value to retrieve.
   * @returns {LocalStoreResponse} The response object indicating the result of the operation.
   */
  get(key: string): LocalStoreResponse {
    const value = this.storage.get(key); // Attempt to get the value for the given key.
    if (value === undefined) {
      // If the key doesn't exist, return a resource not found response.
      return { code: ResponseStatus.RESOURCE_NOT_FOUND, message: `Key '${key}' not found.` };
    }
    // If the key is found, return the value along with a success message.
    return { code: ResponseStatus.OPERATION_OK, data: value, message: "Record found." };
  }

  /**
   * Deletes a key-value pair from the storage.
   * Returns a response object indicating whether the deletion was successful.
   * @param {string} key - The key of the value to delete.
   * @returns {LocalStoreResponse} The response object indicating the result of the operation.
   */
  delete(key: string): LocalStoreResponse {
    if (this.storage.has(key)) {
      // If the key exists, delete it from the Map.
      this.storage.delete(key);
      return { code: ResponseStatus.OPERATION_OK, message: "Record deleted successfully." };
    }
    // If the key doesn't exist, return a resource not found response.
    return { code: ResponseStatus.RESOURCE_NOT_FOUND, message: `Key '${key}' not found.` };
  }
}
