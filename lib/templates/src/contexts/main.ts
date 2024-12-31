import dotenv from "dotenv";
import { ApplicationCore } from "./ApplicationCore";
import { ControllerDependencyInjector } from "./ControllerDependencyInjector";
dotenv.config();
/**
 * Initializes the application context by setting up the necessary components and configurations.
 */
ApplicationCore.initialize();

/**
 * Configures and sets up the TemplateController by injecting dependencies such as the service,
 * repository, and use cases. This controller will handle HTTP requests for template-related operations.
 */
const controller = ControllerDependencyInjector.setupController();

export { controller };

(async () => {
  try {
    // Create a template with id "1"
    const creatingOne = await controller.create("1", "Template for core one", "active");
    console.log("Result when creating record one:", creatingOne);

    // Create another template with id "2" if the first creation was successful
    if (creatingOne.statusCode === 200) {
      let creatingTwo = await controller.create("2", "Template for audit two", "active");
      console.log("Result when creating record two:", creatingTwo);

      // Find and log the template with id "1"
      const result = await controller.find("1");
      console.log("Result when searching for record one with id: 1", result);
    }

    // Try to find a non-existing template (id "4")
    const resultNot = await controller.find("4");
    console.log("Result when searching for non-existent record with id: 4:", resultNot);

    // Update the template with id "2" to status "pending"
    const updateOne = await controller.update("1", "Template for audit one", "pending");
    console.log("Result when updating pending status to id: 1:", updateOne);

    // Find and log the updated template with id "1"
    if (updateOne.statusCode === 200) {
      const updatedResult = await controller.find("1");
      console.log("Result when searching for updated record with id: 1:", updatedResult);
    }

    // Delete the template with id "3"
    const deleteResult = await controller.delete("3");
    console.log("Result when deleting non-existent record with id: 3:", deleteResult);

    // Attempt to create a template with an invalid name (empty string)
    const notName = await controller.create("4", "", "active");
    console.log("Result when creating a record by sending empty name with id", notName);

    // Attempt to create a template with a name that is too short
    const nameCharacter = await controller.create("4", "na", "active");
    console.log("Result when creating a record by sending name business rules not allowed", nameCharacter);
  } catch (error) {
    console.error("Error during execution:", error);
  }
})();
