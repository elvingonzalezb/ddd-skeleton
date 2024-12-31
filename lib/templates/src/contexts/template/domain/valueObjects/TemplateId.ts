export class TemplateId {
  constructor(private readonly value: string) {
      if (!value) {
          throw new Error("Id cannot be empty");
      }
  }

  toString(): string {
      return this.value;
  }
}
