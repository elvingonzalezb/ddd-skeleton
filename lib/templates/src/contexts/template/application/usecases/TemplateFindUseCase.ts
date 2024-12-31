import { IDatabaseRepository } from '../../domain/repositories/IDatabaseRepository';
import { Either } from '../../../shared/utils/Either';
import { BadRequestResponse } from '../../../shared/responses/BadRequestResponse';
import { InternalErrorResponse } from '../../../shared/responses/InternalErrorResponse';
import { MessageResponse } from '../../../shared/enums/Responses';
import { CaseUseResponse } from '../../../shared/types/CommonType';
import { TemplateDTO } from '../DTO/TemplateDTO';
import { Template } from '../../domain/entities/Template';
import { IDatabaseDriver } from '../../domain/repositories/IDatabaseDriver';

/**
 * Use case for finding a by its ID.
 * This class is responsible for transforming the DTO to an entity,
 * interacting with the database, and handling the responses.
 */
export class TemplateFindUseCase {
  // Injecting dependencies: repository and database driver
  constructor(
    private readonly repository: IDatabaseRepository,
    private readonly driver: IDatabaseDriver
  ) {}

  /**
   * Executes the find use case.
   * This method processes the DTO, transforms it to an entity, and retrieves it from the database.
   * @param request - The data transfer object (DTO) containing the ID.
   * @returns Either an error or a successful response with the found data.
   */
  async execute(request: TemplateDTO): Promise<Either<CaseUseResponse, Error>> {
    try {
      const data = new Template(request.id);

      const selectQuery = this.driver.prepareDataFindById(data);
      const response = await this.repository.findById(selectQuery);

      if (response.isError()) {
        return Either.Error(response.getError());
      }

      if (!response.getValue().data) {
        return Either.Error(
          new BadRequestResponse(MessageResponse.RESOURCE_NOT_FOUND)
        );
      }
      return Either.Ok(response.getValue().data);
    } catch (error) {
      return Either.Error(
        new InternalErrorResponse(MessageResponse.INTERNAL_ERROR)
      );
    }
  }
}
