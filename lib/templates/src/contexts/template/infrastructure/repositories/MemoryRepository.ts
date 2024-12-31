import { IDatabaseRepository } from "../../domain/repositories/IDatabaseRepository";
import { Either } from "../../../shared/utils/Either";
import { DatabaseRequest } from "../../../shared/types/Database";
import { InternalErrorResponse } from "../../../shared/responses/InternalErrorResponse";
import { MessageResponse } from "../../../shared/enums/Responses";
import { LocalStore } from "../persistence/LocalStore";
import { CaseUseResponse } from "../../../shared/types/CommonType";

export class MemoryRepository implements IDatabaseRepository {
  private readonly store = LocalStore.getInstance();

  async save(data: DatabaseRequest): Promise<Either<CaseUseResponse, Error>> {
    try {
      const response = this.store.set(data.data[0].id, data.data[0]);
      return Either.Ok(response);
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

  async findById(data: DatabaseRequest): Promise<Either<CaseUseResponse, Error>> {
    try {
      const response = this.store.get(data.query);
      return Either.Ok(response);
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

  async update(data: DatabaseRequest): Promise<Either<CaseUseResponse, Error>> {
    try {
      const update = this.store.set(data.data[0].id, data.data[0]);
      return Either.Ok(update);
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }

  async delete(data: DatabaseRequest): Promise<Either<CaseUseResponse, Error>> {
    try {
      const response = this.store.delete(data.query);
      return Either.Ok(response);
    } catch (error) {
      return Either.Error(new InternalErrorResponse(MessageResponse.INTERNAL_ERROR));
    }
  }
}
