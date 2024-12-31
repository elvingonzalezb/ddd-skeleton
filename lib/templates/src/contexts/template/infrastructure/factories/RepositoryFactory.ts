import { PostgresRepository } from '../repositories/PostgresRepository';
import { MongoDBRepository } from '../repositories/MongoDBRepository';
import { MemoryRepository } from '../repositories/MemoryRepository';

/**
 * Factory class responsible for creating repository instances based on the database driver.
 */
export class RepositoryFactory {
   /**
   * Map of repository classes for different database types.
   * @type {Object}
   * @property {MongoDBRepository} mongodb - MongoDB repository class.
   * @property {PostgresRepository} postgres - PostgreSQL repository class.
   * @property {MemoryRepository} memory - In-memory repository class.
   */
  static readonly repositoryMap = {
    mongodb: MongoDBRepository,
    postgres: PostgresRepository,
    memory: MemoryRepository
  };

   /**
   * Creates a repository instance based on the specified database driver type.
   * @param {string} driver - The type of the database driver (e.g., "memory", "mongodb", "postgres").
   * @param {any} connection - The connection object that will be passed to the repository.
   * @returns {Object} - An instance of the corresponding repository class.
   * @throws {Error} - Throws an error if the provided driver type is not supported.
   */
  static createRepository(
    driver: 'memory' | 'mongodb' | 'postgres',
    connection: any
  ) {
    const RepositoryClass = this.repositoryMap[driver];
    if (!RepositoryClass) {
      throw new Error(`Repository for driver "${driver}" not supported.`);
    }
    return new RepositoryClass(connection);
  }
}
