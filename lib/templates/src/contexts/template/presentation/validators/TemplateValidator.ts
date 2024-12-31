/* Un validador para asegurarse que los datos sean válidos.
 * Puede cambiar por la lib de preferencia como joi - zod
 */
import { ALLOWED_STATUS } from "../../../shared/enums/General";
import { ValidationResult } from "../../../shared/types/ValidationError";

export class TemplateValidator {
  /**
   * Simulates the validation
   * @param id Identifier
   * @param name Name.
   * @param status Status.
   * @returns Object ValidationResult.
   */
  static TemplateValidateData(id: string, name?: string, status?: string): ValidationResult {
    const errors = [];

    if (!id) {
      errors.push("App ID is required.");
    }

    if (!name) {
      errors.push("App name is required.");
    }

    if (status) {
      if (!ALLOWED_STATUS.includes(status)) {
        errors.push(`Invalid App status. Allowed values are "active", "pending", "in-progress", "completed".`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}

/**
 * Example of use with joi library
 */
// import Joi from "joi";

// export class TemplateValidator {
//   private static readonly schema = Joi.object({
//     id: Joi.string().required(),
//     name: Joi.string().required(),
//     status: Joi.string().valid(...ALLOWED_STATUS).required(),
//   });

//   static validateData(data: { id: string; name: string; status: string }) {
//     const { error, value } = this.schema.validate(data, { abortEarly: false });
//     return {
//       isValid: !error,
//       errors: error ? error.details.map((err: any) => err.message) : undefined,
//       value,
//     };
//   }
// }


