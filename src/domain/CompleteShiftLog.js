"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteShiftLog = void 0;
const dayjs = require('dayjs');
class CompleteShiftLog {
    constructor(info = '', updated_at = dayjs()) {
        this._id = 0;
        this._info = info;
        this._updatedAt = updated_at;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get info() {
        return this._info;
    }
    set info(info) {
        this._info = info;
    }
    get updated_at() {
        return this._updatedAt;
    }
    set updated_at(updated_at) {
        this._updatedAt = updated_at;
    }
}
exports.CompleteShiftLog = CompleteShiftLog;
