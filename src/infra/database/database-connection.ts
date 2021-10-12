export default interface DatabaseConnection {
  table(table: string): DatabaseConnection;
  where(column: string, operatorOrValue: any, value?: any): DatabaseConnection;
  get(): Promise<any[]>;
  first(): Promise<any>;
  insert(object: any): Promise<void>;
}