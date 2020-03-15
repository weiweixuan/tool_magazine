"use strict";
/**
 * 功能：定义一个 操作数据库的库， 支持 Mysql , Mssql , MongoDb 类
 * 连接数据库的类都有 add , update , delete , get 方法
 * 注意统一接口规范
 */
var Mysql = /** @class */ (function () {
    function Mysql() {
        this.list = [];
    }
    Mysql.prototype.add = function (value) {
        return true;
    };
    Mysql.prototype.update = function (id, value) {
        return true;
    };
    Mysql.prototype.delete = function (id) {
        return true;
    };
    Mysql.prototype.get = function (id) {
        return [];
    };
    return Mysql;
}());
var MongoDB = /** @class */ (function () {
    function MongoDB() {
    }
    MongoDB.prototype.add = function (value) {
        throw new Error("Method not implemented.");
    };
    MongoDB.prototype.update = function (id, value) {
        throw new Error("Method not implemented.");
    };
    MongoDB.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MongoDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MongoDB;
}());
