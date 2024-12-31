/**
 * Custom Error class for handling "Resource Not Found" errors.
 *
 * @class ResourceNotFoundResponse
 * @extends Error
 *
 * @example
* throw new ResourceNotFoundResponse("The requested resource was not found.");
*/
export class ResourceNotFoundResponse extends Error {
 /**
	* Creates an instance of the ResourceNotFoundResponse error.
	* @param message - The message that describes the resource not found error.
	*/
 constructor(message: string) {
	 super(message);
 }
}
