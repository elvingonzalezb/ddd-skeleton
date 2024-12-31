/**
 * Custom Error class for handling Bad Request responses.
 *
 * @class BadRequestResponse
 * @extends Error
 *
 * @example
* throw new BadRequestResponse("Invalid input provided.");
*/
export class BadRequestResponse extends Error {
 /**
	* Creates an instance of the BadRequestResponse error.
	* @param message - The message that describes the bad request error.
	*/
 constructor(message: string) {
	 super(message);
 }
}
