/**
 * Here you can add response constants for use in all layers
 */
import { HttpResponse } from "../interfaces/Responses";

/**
 * Enum representing the HTTP status codes.
 *
 * @enum {number}
 */
export enum ResponseStatus {
  OPERATION_OK = 200,
  BAD_REQUEST = 400,
  RESOURCE_NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

/**
 * Enum representing response code
 *
 * @enum {string}
 */
export enum ResponseCode {
  OPERATION_OK = "OPERATION_OK",
  BAD_REQUEST = "BAD_REQUEST",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

/**
 * Enum representing response messages..
 *
 * @enum {string}
 */
export enum MessageResponse {
  OPERATION_OK = "Operation completed successfully.",
  BAD_REQUEST = "Invalid request.",
  BAD_REQUEST_INVALID_BUSINESS_RULES = "Invalid business rules.",
  RESOURCE_NOT_FOUND = "Resource Not found",
  INTERNAL_ERROR = "An internal server error occurred.",
}

/**
 * Creates an HTTP response object with a given status code, message, and optional data.
 *
 * @param {ResponseStatus} statusCode - The HTTP status code for the response.
 * @param {string | MessageResponse} message - The message describing the response.
 * @param {any} [data] - Optional data to include in the response body.
 * @returns {HttpResponse} The constructed HTTP response object.
 */
export const createResponse = (
  statusCode: ResponseStatus,
  message: string | MessageResponse,
  data?: any
): HttpResponse => {
  const response: HttpResponse = {
    statusCode,
    message,
  };

  if (data) {
    response.body = JSON.stringify(data);
  }

  return response;
};

/**
 * Predefined HTTP response generators.
 *
 * @object
 */
export const RESPONSES = {
  /**
   * Generates a successful HTTP response (200 OK).
   *
   * @param {any} [data] - Optional data to include in the response body.
   * @returns {HttpResponse} The HTTP response object.
   */
  OK: (data?: any): HttpResponse =>
    createResponse(
      ResponseStatus.OPERATION_OK,
      MessageResponse.OPERATION_OK,
      data
    ),

  /**
   * Generates a bad request HTTP response (400).
   *
   * @param {string | MessageResponse} message - The message describing the error.
   * @returns {HttpResponse} The HTTP response object.
   */
  BAD_REQUEST: (message: string | MessageResponse): HttpResponse =>
    createResponse(
      ResponseStatus.BAD_REQUEST,
      message || MessageResponse.BAD_REQUEST
    ),

  /**
   * Generates a resource not found HTTP response (404).
   *
   * @param {string | MessageResponse} message - The message describing the error.
   * @returns {HttpResponse} The HTTP response object.
   */
  RESOURCE_NOT_FOUND: (message: string | MessageResponse): HttpResponse =>
    createResponse(
      ResponseStatus.RESOURCE_NOT_FOUND,
      message || MessageResponse.RESOURCE_NOT_FOUND
    ),

  /**
   * Generates an internal error HTTP response (500).
   *
   * @param {string | MessageResponse} message - The message describing the error.
   * @returns {HttpResponse} The HTTP response object.
   */
  INTERNAL_ERROR: (message: string | MessageResponse): HttpResponse =>
    createResponse(
      ResponseStatus.INTERNAL_ERROR,
      message || MessageResponse.INTERNAL_ERROR
    ),
};
