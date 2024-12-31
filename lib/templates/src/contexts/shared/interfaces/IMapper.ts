/**
 * A generic interface for mappers that transform between domain entities and data transfer objects (DTOs).
 *
 * This interface defines two methods that must be implemented:
 * - `toDTO`: Converts a domain entity into a DTO.
 * - `toDomain`: Converts a DTO into a domain entity.
 * 
 * @template TDomain - The type of the domain entity.
 * @template TDTO - The type of the data transfer object (DTO).
 */
export interface IMapper<TDomain, TDTO> {

  /**
   * Converts a domain entity to its corresponding data transfer object (DTO).
   *
   * @param {TDomain} domainEntity - The domain entity to be converted into a DTO.
   * @returns {TDTO} The corresponding data transfer object (DTO).
   */
  toDTO(domainEntity: TDomain): TDTO;

  /**
   * Converts a data transfer object (DTO) to its corresponding domain entity.
   *
   * @param {TDTO} dto - The data transfer object to be converted into a domain entity.
   * @returns {TDomain} The corresponding domain entity.
   */
  toDomain(dto: TDTO): TDomain;
}
