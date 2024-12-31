export type DatabaseRequest = {
  tableName: string;
  query: any;
  data: any[];
};

export type DatabaseRequestMongoDB = Omit<DatabaseRequest, 'query'> & {
  query: Record<string, any>;
};
