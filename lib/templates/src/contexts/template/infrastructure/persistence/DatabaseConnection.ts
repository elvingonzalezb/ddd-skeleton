export abstract class DatabaseConnection {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
}
