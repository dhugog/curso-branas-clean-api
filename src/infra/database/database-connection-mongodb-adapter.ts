import { Collection, MongoClient } from "mongodb";
import env from "../../main/config/env";
import DatabaseConnection from "./database-connection";

type OperatorsDictionary = {
  [key: string]: string
}

export default class DatabaseConnectionMongodbAdapter implements DatabaseConnection {
  private collection: string | undefined;
  private conditions: any;

  private operators: OperatorsDictionary = {
    '=': '$eq',
    '>': '$gt',
    '>=': '$gte',
    '<': '$lt',
    '<=': '$lte'
  }

  constructor() {
    this.conditions = {};
  }

  run(work: (connection: MongoClient) => Promise<any>): Promise<any> {
    return new Promise((resolve) => {
      MongoClient.connect(env.mongoUrl, async (err, connection) => {
        if (!connection || err) {
          throw new Error('Could\'nt connect to database server');
        }

        const result = await work(connection);

        await connection.close();

        resolve(result);
      })
    })
  }

  table(table: string): DatabaseConnection {
    this.collection = table;
    this.conditions = {};

    return this;
  }

  where(column: string, operatorOrValue: any, value?: any): DatabaseConnection {
    if (!this.collection) {
      throw new Error('No table selected');
    }

    const valueToApply = value ? { [this.operators[operatorOrValue]]: value } : operatorOrValue;

    this.conditions[column] = valueToApply;

    return this;
  }

  async get(): Promise<any[]> {
    return this.run((connection: MongoClient): Promise<any[]> => {
      if (!this.collection) {
        throw new Error('No table selected');
      }

      return connection.db().collection(this.collection).find(this.conditions).toArray();
    })
  }

  first(): Promise<any> {
    return this.run((connection: MongoClient): Promise<any> => {
      if (!this.collection) {
        throw new Error('No table selected');
      }

      return connection.db().collection(this.collection).findOne(this.conditions) as any;
    })
  }

  insert(object: any): Promise<void> {
    return this.run(async (connection: MongoClient) => {
      if (!this.collection) {
        throw new Error('No table selected');
      }

      return connection.db().collection(this.collection).insertOne(object);
    })
  }
}