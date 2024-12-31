import { HttpResponse, LocalStoreResponse } from "../interfaces/Responses";

/**
 * Maps a LocalStoreResponse to an HttpResponse.
 *
 * @param localResponse - The response received from the local storage or data storage system.
 * @returns HttpResponse - The mapped response in HttpResponse format, containing status code,
 *                          message, and optionally, the data.
 */
export function mapToHttpResponse(localResponse: LocalStoreResponse): HttpResponse {
  return {
    statusCode: localResponse.code,
    message: localResponse.message,
    body: localResponse.data,
  };
}
