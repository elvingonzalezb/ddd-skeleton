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
 * Use case for updating a in the system.
 * The class handles the transformation of the DTO to an entity,
 * the validation of the entity, and the update process in the database.
 */
export class TemplateUpdateUseCase implements IUseCases {
  constructor(
    private readonly repository: IDatabaseRepository,
    private readonly service: TemplateService,
    private readonly driver: IDatabaseDriver
  ) {}

  /**
   * Executes the update use case.
   * This method processes the input DTO, validates it,
   * and performs the update operation in the database.
   * @param request - The DTO containing the data to be updated.
   * @returns Either an error or a successful response with the updated data.
   */
  async execute(request: TemplateDTO): Promise<Either<CaseUseResponse, Error>> {
    try {

      const data = new Template(request.id, request.name, request.status);

      // Validate the entity using its own business rules
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

      const updateQuery = this.driver.prepareDataUpdate(data);

      // Execute the update query in the repository
      const response = await this.repository.update(updateQuery);
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
