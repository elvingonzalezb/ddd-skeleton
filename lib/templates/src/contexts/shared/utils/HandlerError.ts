import { RESPONSES } from "../enums/Responses";
import { HttpResponse } from "../interfaces/Responses";
import { BadRequestResponse } from "../responses/BadRequestResponse";
import { InternalErrorResponse } from "../responses/InternalErrorResponse";
import { ResourceNotFoundResponse } from "../responses/ResourceNotFoundResponse";

/**
 * Handles errors by mapping them to corresponding HTTP responses.
 *
 * @param {Error} error - The error to be handled.
 * @returns {HttpResponse} The corresponding HTTP response.
 */
export const handlerError = (error: Error): HttpResponse => {
	switch (true) {
		case error instanceof InternalErrorResponse:
			return RESPONSES.INTERNAL_ERROR(error.message);
		case error instanceof BadRequestResponse:
			return RESPONSES.BAD_REQUEST(error.message);
		case error instanceof ResourceNotFoundResponse:
			return RESPONSES.RESOURCE_NOT_FOUND(error.message);
		default:
			return RESPONSES.INTERNAL_ERROR(error.message);
	}
};
