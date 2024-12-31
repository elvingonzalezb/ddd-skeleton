export interface DatabaseConfig {
  driver: "memory" | "mongodb" | "postgres";
}

/**
 * Here you can change the database type driver to use
 */
export const databaseConfig: DatabaseConfig = {
  driver: "memory",
};
