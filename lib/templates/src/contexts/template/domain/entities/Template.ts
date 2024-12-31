import { StatusType } from "../../../shared/types/CommonType";
import { ValidationResult } from "../../../shared/types/ValidationError";

/**
 * Class represents a entity with an ID, name, and status.
 * This class also includes methods to get/set properties and validate business rules.
 */
export class Template {
  // Table name where the entity data would be stored, it can be customized later
  protected readonly tableName: string = "change_me";

  /**
   * Constructor to create a new instance.
   * @param id - The unique identifier.
   * @param name - The name.
   * @param status - The status.
   */
  constructor(
    public id: string,
    public name?: string,
    public status?: StatusType
  ) {}

  /**
   * Returns the ID
   * @returns The ID.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Returns the name.
   * @returns The name or undefined if not set.
   */
  getName(): string | undefined {
    return this.name;
  }

  /**
   * Returns the status.
   * @returns The status or undefined if not set.
   */
  getStatus(): StatusType | undefined {
    return this.status;
  }

  /**
   * Sets the name.
   * @param name - The new name.
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Sets the status.
   * @param status - The new status.
   */
  setStatus(status: StatusType): void {
    this.status = status;
  }

  /**
   * Returns the table name that will be used for database operations.
   * @returns The table name.
   */
  getTableName(): string {
    return `${this.tableName}`;
  }

  /**
   * Validates the business rules.
   * This method checks if the name is valid (at least 3 characters).
   * @returns A validation result indicating whether the entity is valid or not.
   */
  validateBusinessRules(): ValidationResult {
    const errors = [];

    // Rule: Name must be at least 3 characters long
    if (this.name && this.name.length < 3) {
      errors.push("Name must have at least 3 characters.");
    }

    // Return validation result
    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
