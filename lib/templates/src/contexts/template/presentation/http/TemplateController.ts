import { TemplateCreateUseCase } from "../../application/usecases/TemplateCreateUseCase";
import { TemplateFindUseCase } from "../../application/usecases/TemplateFindUseCase";
import { TemplateUpdateUseCase } from "../../application/usecases/TemplateUpdateUseCase";
import { TemplateDeleteUseCase } from "../../application/usecases/TemplateDeleteUseCase";
import { handlerError } from "../../../shared/utils/HandlerError";
import { RESPONSES } from "../../../shared/enums/Responses";
import { StatusType } from "../../../shared/types/CommonType";
import { TemplateDTO } from "../../application/DTO/TemplateDTO";
import { HttpResponse } from "../../../shared/interfaces/Responses";

/**
 * A clean controller focused on delegating tasks and managing the interaction between the presentation layer and the application.
 * It is responsible only for transforming raw data into DTOs and delegating the logic to the use case.
 * It does not directly instantiate or validate entities.
 */
export class TemplateController {
  constructor(
    private readonly createUseCase: TemplateCreateUseCase,
    private readonly findUseCase: TemplateFindUseCase,
    private readonly updateUseCase: TemplateUpdateUseCase,
    private readonly deleteUseCase: TemplateDeleteUseCase
  ) {}

  /**
   * Method to create a template.
   * @param id Identifier.
   * @param name Name.
   * @param status Status of the template.
   */
  async create(id: string, name: string, status: StatusType): Promise<HttpResponse> {
    // Builds the DTO and sends it to the use case for execution.
    const data = new TemplateDTO(id, name, status);
    const response = await this.createUseCase.execute(data);

    // Handles the response, either returning the error handler or success response.
    return response.fold({
      fnError: (error) => handlerError(error),
      fnOk: () => RESPONSES.OK(),
    });
  }

  /**
   * Method to find a template by its ID.
   * @param id Identifier of the template.
   */
  async find(id: string): Promise<HttpResponse> {
    const dataId = new TemplateDTO(id);
    const response = await this.findUseCase.execute(dataId);

    // Handles the response, returning the error handler or the found template data.
    return response.fold({
      fnError: (error) => handlerError(error),
      fnOk: (value) => RESPONSES.OK(value),
    });
  }

  /**
   * Method to update a template.
   * @param id Identifier.
   * @param name Name.
   * @param status Status.
   */
  async update(id: string, name: string, status: StatusType): Promise<HttpResponse> {
    const data = new TemplateDTO(id, name, status);
    const response = await this.updateUseCase.execute(data);

    // Handles the response, logging success or executing the error handler.
    return response.fold({
      fnError: (error) => handlerError(error),
      fnOk: (value) => RESPONSES.OK(value),
    });
  }

  /**
   * Method to delete a template by its ID.
   * @param id Identifier of the template.
   */
  async delete(id: string): Promise<HttpResponse> {
    const dataId = new TemplateDTO(id);
    const response = await this.deleteUseCase.execute(dataId);

    // Handles the response, logging success or executing the error handler.
    return response.fold({
      fnError: (error) => handlerError(error),
      fnOk: (value) => RESPONSES.OK(value),
    });
  }
}
