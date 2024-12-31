/**
 * Interface representing an HTTP response structure.
 */
export interface HttpResponse {
  statusCode: number;
  message: string;
  body?: string;
  error?: string;}

/**
 * Interface representing a response from a local storage or a data storage system.
 */
export interface LocalStoreResponse {
  code: number;
  message: string;
  data?: any;
}
