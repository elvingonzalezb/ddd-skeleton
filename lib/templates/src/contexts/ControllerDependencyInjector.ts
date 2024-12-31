import { TemplateService } from './template/domain/services/TemplateService';
import { TemplateCreateUseCase } from './template/application/usecases/TemplateCreateUseCase';
import { TemplateFindUseCase } from './template/application/usecases/TemplateFindUseCase';
import { TemplateUpdateUseCase } from './template/application/usecases/TemplateUpdateUseCase';
import { TemplateDeleteUseCase } from './template/application/usecases/TemplateDeleteUseCase';
import { TemplateController } from './template/presentation/http/TemplateController';
import { ApplicationCore } from './ApplicationCore';

/**
 * The ControllerDependencyInjector class is responsible for setting up the necessary components
 * for the TemplateController, including creating and injecting the use cases and services.
 * It configures all the required dependencies, such as the service, repository, and driver,
 * before passing them to the TemplateController for use in handling HTTP requests.
 */
export class ControllerDependencyInjector {
  /**
   * Sets up the controller by creating and injecting the necessary dependencies, including
   * use cases, services, repositories, and the driver. It configures the controller with
   * these dependencies, enabling it to handle various template-related HTTP requests.
   *
   * @example
   * const controller = ControllerDependencyInjector.setupController();
   *
   * @returns {TemplateController} The configured TemplateController instance.
   */
  static setupController() {
    // Create the TemplateService instance
    const service = new TemplateService();

    // Get the repository and driver from the ApplicationCore
    const repository = ApplicationCore.repository;
    const driver = ApplicationCore.driver;

    // Create the use case instances
    const createUseCase = new TemplateCreateUseCase(repository, service, driver);
    const findUseCase = new TemplateFindUseCase(repository, driver);
    const updateUseCase = new TemplateUpdateUseCase(repository, service, driver);
    const deleteUseCase = new TemplateDeleteUseCase(repository, driver);

    // Create and return the TemplateController with the necessary use cases
    return new TemplateController(
      createUseCase,
      findUseCase,
      updateUseCase,
      deleteUseCase
    );
  }
}
