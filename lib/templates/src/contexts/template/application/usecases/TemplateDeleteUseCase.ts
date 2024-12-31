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
 * DeleteUseCase is responsible for handling the deletion.
 * It receives data from the DTO, transforms it into an entity, validates it,
 * and then performs the deletion operation in the database.
 */
export class TemplateDeleteUseCase {
  // Injecting dependencies: repository and database driver
  constructor(
    private readonly repository: IDatabaseRepository,
    private readonly driver: IDatabaseDriver
  ) {}

  /**
   * Executes the deletion use case.
   * This method processes the DTO, transforms it to an entity, and deletes it from the database.
   * @param request - The data transfer object (DTO) with details.
   * @returns Either an error or a successful response with the deleted data.
   */
  async execute(request: TemplateDTO): Promise<Either<CaseUseResponse, Error>> {
    try {
      // Transform DTO into a entity
      const data = new Template(request.id);

      const deleteQuery = this.driver.prepareDataDelete(data);

      // Execute the query to delete the data in the repository
      const response = await this.repository.delete(deleteQuery);

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