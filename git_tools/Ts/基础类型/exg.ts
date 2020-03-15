/**
 * 功能：定义一个 操作数据库的库， 支持 Mysql , Mssql , MongoDb 类
 * 连接数据库的类都有 add , update , delete , get 方法
 * 注意统一接口规范
 */

interface Sql<T> {
  add(value: T): boolean;
  update(id: number, value: T): boolean;
  delete(id: number): boolean;
  get(id: number): any[];
}

class Mysql<T> implements Sql<T> {
  list: object[];
  constructor() {
    this.list = [];
  }
  add<T>(value: T) {
    return true;
  }
  update<T>(id: number, value: T) {
    return true;
  }
  delete(id: number) {
    return true;
  }
  get(id: number) {
    return [];
  }
}

class MongoDB<T> implements Sql<T> {
  add(value: T): boolean {
    throw new Error("Method not implemented.");
  }
  update(id: number, value: T): boolean {
    throw new Error("Method not implemented.");
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }
  get(id: number): any[] {
    throw new Error("Method not implemented.");
  }
}
