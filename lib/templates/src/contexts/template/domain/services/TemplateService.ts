/**
 * Apply business rules or domain validations.
 */
import { TemplateValidator } from "../../presentation/validators/TemplateValidator";
import { Template } from "../entities/Template";

export class TemplateService {
  /**
   * Validates the entity data.
   * @param data - The entity that needs to be validated.
   * @returns The result of the validation.
   */
  validate(data: Template) {
    // Use the validator to verify the rules
    return TemplateValidator.TemplateValidateData(data.id, data.name, data.status);
  }
}
