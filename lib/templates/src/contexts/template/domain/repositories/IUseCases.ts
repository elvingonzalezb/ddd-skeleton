import { CaseUseResponse } from "../../../shared/types/CommonType";
import { Either } from "../../../shared/utils/Either";
import { TemplateDTO } from "../../application/DTO/TemplateDTO";

export interface IUseCases {
  /**
   * Executes the use case logic.
   * This method will be implemented by different use cases such as `CreateUseCase`, `UpdateUseCase`, etc.
   *
   * @param request - The input data, typically a DTO (entityDTO) that carries necessary information.
   * @returns A Promise that resolves to either a `CaseUseResponse` if successful, or an `Error` if something goes wrong.
   */
  execute(request: TemplateDTO): Promise<Either<CaseUseResponse, Error>>;
}
