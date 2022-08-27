"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
class Admin {
    constructor(username = '', password = '') {
        this._id = 0;
        this._username = username;
        this._password = password;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get username() {
        return this._username;
    }
    set username(username) {
        this._username = username;
    }
    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }
}
exports.Admin = Admin;
