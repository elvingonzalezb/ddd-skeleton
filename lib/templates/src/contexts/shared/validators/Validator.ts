export abstract class Validator<T> {
  abstract validate(input: T): void;
}
