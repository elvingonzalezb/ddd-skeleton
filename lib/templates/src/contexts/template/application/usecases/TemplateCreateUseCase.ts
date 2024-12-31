import { IDatabaseRepository } from '../../domain/repositories/IDatabaseRepository';
import { Either } from '../../../shared/utils/Either';
import { Template } from '../../domain/entities/Template';
import { TemplateService } from '../../domain/services/TemplateService';
import { TemplateDTO } from '../DTO/TemplateDTO';
import { BadRequestResponse } from '../../../shared/responses/BadRequestResponse';
import { MessageResponse } from '../../../shared/enums/Responses';
import { InternalErrorResponse } from '../../../shared/responses/InternalErrorResponse';
import { CaseUseResponse } from '../../../shared/types/CommonType';
import { IUseCases } from '../../domain/repositories/IUseCases';
import { IDatabaseDriver } from '../../domain/repositories/IDatabaseDriver';

/**
 * CreateUseCase is responsible for handling the creation of a domain
 * It receives data from the DTO, validates the data, transforms it into an entity,
 * and then persists it in the database.
 * Implements the IUseCases interface for consistent execution logic.
 */
export class TemplateCreateUseCase implements IUseCases {
  // Injecting dependencies: repository, service, and database driver
  constructor(
    // Repository to handle data persistence
    private readonly repository: IDatabaseRepository,
    // Service for business logic validation
    private readonly service: TemplateService,
    // Driver for interacting with the database
    private readonly driver: IDatabaseDriver
  ) {}

  /**
   * Executes the creation use case.
   * This method processes the DTO, validates the data, transforms it to an entity,
   * and persists it in the database.
   * @param request - The data transfer object (DTO) with details.
   * @returns Either an error or a successful response containing the created data.
   */
  async execute(request: TemplateDTO): Promise<Either<CaseUseResponse, Error>> {
    try {
      // Transform DTO into a entity
      const data = new Template(request.id, request.name, request.status);

      // Validate the using its business rules
      const validationBusinessRulesResult = data.validateBusinessRules();
      if (!validationBusinessRulesResult.isValid) {
        return Either.Error(
          new BadRequestResponse(
            MessageResponse.BAD_REQUEST_INVALID_BUSINESS_RULES
          )
        );
      }

      // Validate the entity using the service
      const validationResult = this.service.validate(data);
      if (!validationResult.isValid) {
        return Either.Error(
          new BadRequestResponse(MessageResponse.BAD_REQUEST)
        );
      }

      /**
       * Depending on the configured database driver (e.g., memory, MongoDB, Postgres),
       * prepare the data for the query.
       */
      // Prepare the data for the save query
      const createQuery = this.driver.prepareDataSave(data);

      // Execute the query to save the data in the repository
      const response = await this.repository.save(createQuery);
      if (response.isError()) {
        return Either.Error(response.getError());
      }
      return Either.Ok(response.getValue().data);
    } catch (error) {
      return Either.Error(
        new InternalErrorResponse(MessageResponse.INTERNAL_ERROR)
      );
    }
  }
}
