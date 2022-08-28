"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteShift = void 0;
const dayjs = require('dayjs');
class CompleteShift {
    constructor(staff_id = 0, status_id = 0, day = dayjs()) {
        this._id = 0;
        this._staffId = staff_id;
        this._statusId = status_id;
        this._day = day;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get staff_id() {
        return this._staffId;
    }
    set staff_id(staff_id) {
        this._staffId = staff_id;
    }
    get status_id() {
        return this._statusId;
    }
    set status_id(status_id) {
        this._statusId = status_id;
    }
    get day() {
        return this._day;
    }
    set day(day) {
        this._day = day;
    }
}
exports.CompleteShift = CompleteShift;
