/**
 * DTO class represents a Data Transfer Object for a data
// It is used to transfer template-related information within the application
 */
import { StatusType } from "../../../shared/types/CommonType";

export class TemplateDTO {
  id: string;
  name?: string;
  status?: StatusType;

  constructor(id: string, name?: string, status?: StatusType) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}