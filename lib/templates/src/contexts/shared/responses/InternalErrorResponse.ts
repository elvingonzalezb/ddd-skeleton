/**
 * Custom Error class for handling Internal Server errors.
 *
 * @class InternalErrorResponse
 * @extends Error
 *
 * @example
* throw new InternalErrorResponse("An unexpected error occurred.");
*/
export class InternalErrorResponse extends Error {
 /**
	* Creates an instance of the InternalErrorResponse error.
	* @param message - The message that describes the internal server error.
	*/
 constructor(message: string) {
	 super(message);
 }
}
